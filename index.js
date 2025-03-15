require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const User = require("./models/Registration");
const connectDB = require("./db");

const app = express();
const port = process.env.PORT || 3020;

// Connect to MongoDB
connectDB();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle GET Request
app.get("*", (req, res) => {
  res.send("USSD deployed successfully");
});

// Handle USSD Logic
app.post("*", async (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  let response = "";
  let name ="";
  let email ="";

  const dataarray = text.split("*");
  const user = await User.findOne({ phoneNumber });

  // ===== Registration Process ======
  if (!user) {
    if (text === "") {
      response = `CON Welcome to EmpowerTech Malawi Trade Assistant\n
      Please Register First:
      1. Enter Your Full Name`;
    } 
    else if (dataarray.length === 1) {
      
      response = `CON Enter Your Email Address`;
      
    } 
    else if (dataarray.length === 2) {
      email = dataarray[1];
      name = dataarray[0];
      await User.create({ phoneNumber,email, name, dateRegistered: new Date() });
      response = `CON Registration Successful!\n
      1. Trade Information
      2. Report Incident
      3. Help & Support`;
    } 
    else {
      response = `END Invalid input`;
    }
  } 

  // ===== Main USSD Menu for Registered Users ======
  else {
    if (text === "") {
      response = `CON Welcome back to EmpowerTech Malawi Trade Assistant\n
      1. Trade Information
      2. Report Incident
      3. Help & Support`;
    } 
    else if (text === "1") {
      response = `CON Trade Information
      1. Border Regulations
      2. Exchange Rates
      3. Available Trade Officers`;
    } 
    else if (text === "1*1") {
      response = `CON Border Regulations:
      1. Customs Clearance
      2. Tax and Tariffs
      3. Health & Safety Standards
      4. Transport Guidelines`;
    } 
    else if (text === "1*1*1") {
      response = `END Customs Clearance Guidelines:
      - Proper documentation
      - Declaration of goods
      - Payment of duties`;
    } 
    else if (text === "1*1*2") {
      response = `END Tax & Tariff Information:
      - Stay updated on COMESA tariff policies`;
    } 
    else if (text === "1*1*3") {
      response = `END Safety & Health Compliance:
      - Health Inspections
      - Environmental Safety`;
    } 
    else if (text === "1*1*4") {
      response = `END Transport Guidelines:
      - Vehicle Inspection
      - Road Safety Laws`;
    } 
    else if (text === "1*2") {
      response = `END Today's Exchange Rates:
      MWK to ZMW: 1 MWK = 0.04 ZMW`;
    } 
    else if (text === "1*3") {
      response = `END Trade Officers:
      Malawi: +265881234567`;
    } 
    else if (text === "2") {
      response = `CON Report Incident
      1. Report GBV
      2. Report Corruption
      3. Human Rights Violation`;
    } 
    else if (dataarray[0] === "2" && dataarray.length > 1) {
      const reportDetails = dataarray.slice(1).join(" ");
      try {
        response = `END Your report has been submitted successfully.`;
      } catch (error) {
        console.error(error);
        response = `END Failed to submit your report. Try again.`;
      }
    } 
    else if (text === "3") {
      response = `CON Help & Support
      1. Contact Support
      2. FAQ`;
    } 
    else if (text === "3*1") {
      response = `END Support Contacts:
      Malawi: +265999123456`;
    } 
    else if (text === "3*2") {
      response = `END FAQs:
      1. How to report incidents`;
    } 
    else {
      response = `END Invalid input`;
    }
  }

  res.set("Content-Type: text/plain");
  res.send(response);
});

app.listen(port, () => {
  console.log(`USSD server running on port ${port}`);
});

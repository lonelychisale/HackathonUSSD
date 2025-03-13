const express = require('express');
const bodyParser = require('body-parser');
const { response } =  require("express");
const app = express();
const port = 3000;
const logger = require("morgan");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("*", (req, res) => {
  res.send("USSD deployed successfully");
});



  app.post("*", async(req, res) => {
    let { sessionId, serviceCode, phoneNumber, text, response } = req.body;

    let dataarray = text.split("*");

    if (text == "" && language =="") {

     
    
      response = `CON Welcome to COMESA Trade Assistant
      1. Expense & Profit Tracking
      2. Trade Information
      3. Report Incident
      4. Help & Support`;
    
      }
  

  res.set('Content-Type', 'text/plain');
  res.send(response);
});

app.listen(port, () => {
  console.log(`USSD service running on port ${port}`);
});

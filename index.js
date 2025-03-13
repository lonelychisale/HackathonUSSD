const app = require("express")();
const bodyParser = require("body-parser");
const logger = require("morgan");

const { response } = require("express");

let phone = `+265995537312`;

const port = process.env.PORT || 3020;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("*", (req, res) => {
  res.send("USSD deployed successfully");
});

app.post("*", async (req, res) => {
  let { sessionId, serviceCode, phoneNumber, text, response } = req.body;

  let dataarray = text.split("*");
  let dataarraysize = dataarray.length;

  var currentDate = new Date();
  var timestamp = currentDate.toISOString();

  if (text == "") {
    response = `CON Welcome to COMESA Trade Assistant
      1. Expense & Profit Tracking
      2. Trade Information
      3. Report Incident
      4. Help & Support`;
  } 
  else if (text == "1") {
    response = `CON Expense & Profit Tracking
    1. Log an Expense
    2. Log a Sale
    3. View Transaction Summary
    4. Help & Support`;
  } 
  else if (text == "1*1") {
    response = `END Enter expense details (e.g., transport, customs fees):`;
  } 
  else if (text == "1*2") {
    response = `END Enter sale details (e.g., product, amount):`;
  } 
  else if (text == "1*3") {
    response = `END Viewing transaction summary...`;
  } 
  else if (text == "2") {
    response = `CON Trade Information
    1. Import Duty Calculator
    2. Border Regulations
    3. Exchange Rates
    4. Available Trade Officers`;
  } 
  else if (text == "2*1") {
    response = `END Enter the product type to calculate import duty:`;
  } 
  else if (text == "2*2") {
    response = `END Border regulations: 
    1. Customs regulations
    2. Health and safety standards
    3. Transport guidelines`;
  } 
  else if (text == "2*3") {
    response = `END Today's exchange rates: 
    1. MWK to ZMW: 1 MWK = 0.04 ZMW
    2. ZMW to MWK: 1 ZMW = 25 MWK`;
  } 
  else if (text == "2*4") {
    response = `END Trade Officers: 
    1. Malawi: +265881234567
    2. Zambia: +260976543210`;
  } 
  else if (text == "3") {
    response = `CON Report Incident
    1. Report GBV
    2. Report Corruption
    3. Report Human Rights Violation
    4. Emergency Support`;
  } 
  else if (text == "3*1") {
    response = `END Describe the GBV incident:`;
  } 
  else if (text == "3*2") {
    response = `END Describe the corruption incident:`;
  } 
  else if (text == "3*3") {
    response = `END Describe the human rights violation:`;
  } 
  else if (text == "3*4") {
    response = `END Contacting emergency support...`;
  } 
  else if (text == "4") {
    response = `CON Help & Support
    1. Contact Support
    2. FAQ
    3. Back to Main Menu`;
  } 
  else if (text == "4*1") {
    response = `END Support Contacts: 
    Malawi: +265999123456
    Zambia: +260977654321`;
  } 
  else if (text == "4*2") {
    response = `END FAQs:
    1. How to track expenses
    2. How to report incidents
    3. How to access trade information`;
  } 
  else if (text == "4*3") {
    response = `CON Welcome to COMESA Trade Assistant
      1. Expense & Profit Tracking
      2. Trade Information
      3. Report Incident
      4. Help & Support`;
  } 
  else {
    response = `END Invalid input`;
  }

  text = dataarray.join('*');
  res.set("Content-Type: text/plain");
  res.send(response);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

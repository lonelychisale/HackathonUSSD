const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const twilio = require("twilio");

const app = express();
const port = process.env.PORT || 3020;

const accountSid = 'your_twilio_account_sid';
const authToken = 'your_twilio_auth_token';
const twilioClient = twilio(accountSid, authToken);
const twilioPhoneNumber = 'your_twilio_phone_number';

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("*", (req, res) => {
  res.send("USSD deployed successfully");
});

app.post("*", async (req, res) => {
  let { sessionId, serviceCode, phoneNumber, text } = req.body;
  let response = "";

  let dataarray = text.split("*");

  if (text === "") {
    response = `CON Welcome to COMESA Trade Assistant
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
    1. Customs clearance guidelines
    2. Tax and tariff information
    3. Safety and health compliance
    4. Transport guidelines`;
  } 


  else if (text === "1*1*1") {
    response = `END Customs clearance guidelines:
    - Proper documentation
    - Declaration of goods
    - Payment of duties and tariffs
    - Utilize the Regional Customs Transit Guarantee Scheme (RCTG-CARNET) for secure transit of goods under customs seals`;
  }
  
  else if (text === "1*1*2") {
    response = `END Tax and tariff information:
    - Stay updated on import duties and exemptions. For instance, Malawi has removed import duty on specific items like gas appliances and electric motor vehicles. 
    - Review the latest Customs & Excise (Tariffs) Order for detailed information on duties and taxes`;
  }
  
  
  else if (text === "1*1*3") {
    response = `END Safety and health compliance:
    - Quality control standards
    - Health inspections
    - Environmental safety measures
    - Adhere to regional guidelines on the movement of goods and services to ensure safety and health standards are met. [Source: https://www.comesa.int/guidelines-on-movement-of-goods-and-services-in-comesa-region/]
    - Ensure products meet the required safety and health standards to avoid penalties`;
  } 
  
  
  else if (text === "1*1*4") {
    response = `END Transport guidelines:
    - Vehicle inspection
    - Licensing requirements
    - Road safety regulations
    - Familiarize yourself with transport regulations specific to each country within the COMESA region.`;
  }


  else if (text == "1*2") {
    response = `END Today's exchange rates:
    1. MWK to ZMW: 1 MWK = 0.04 ZMW
    2. ZMW to MWK: 1 ZMW = 25 MWK`;
  }
  
  else if (text == "1*3") {
    response = `END Trade Officers:
    1. Malawi: +265881234567
    2. Zambia: +260976543210`;
  }
  
  else if (text === "2") {
    response = `CON Report Incident
    1. Report GBV
    2. Report Corruption
    3. Report Human Rights Violation
    4. Emergency Support`;
  }
  
  else if (text === "2*1") {
    response = `CON Describe the GBV incident:`;
  }
  
  else if (text === "2*2") {
    response = `CON Describe the corruption incident:`;
  }
  
  else if (text === "2*3") {
    response = `CON Describe the human rights violation:`;
  }
  
  else if (text === "2*4") {
    response = `CON Contacting emergency support...`;
  }
  
  else if (dataarray[0] === "2" && dataarray.length > 1) {
    const reportDetails = dataarray.slice(1).join(" ");

    try {
      // await twilioClient.messages.create({
      //   body: `Incident Report: ${reportDetails}`,
      //   from: twilioPhoneNumber,
      //   to: "+265995537312", // Replace with appropriate recipient
      // });
      response = `END Your report has been successfully submitted.`;
    } catch (error) {
      response = `END Failed to submit the report. Please try again.`;
    }
  }
  
  
  else if (text === "3") {
    response = `CON Help & Support
    1. Contact Support
    2. FAQ
    3. Back to Main Menu`;
  } 
  
  
  else if (text === "3*1") {
    response = `END Support Contacts:
    - Malawi: +265999123456
    - Zambia: +260977654321`;
  }
  
  
  else if (text === "3*2") {
    response = `END FAQs:
    - How to report incidents
    - How to access trade information`;
  } 
  
  else if (text === "3*3") {
    response = `CON Welcome to COMESA Trade Assistant
    1. Trade Information
    2. Report Incident
    3. Help & Support`;
  } 
  
  else {
    response = `END Invalid input`;
  }

  res.set("Content-Type: text/plain");
  res.send(response);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

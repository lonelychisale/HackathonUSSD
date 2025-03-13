const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/ussd', (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text,response } = req.body;

 

  switch (text) {
    case '':
      response = `CON Welcome to COMESA Trade Assistant\n1. Expense & Profit Tracking\n2. Trade Information\n3. Report Incident\n4. Help & Support`;
      break;

    case '1':
      response = `CON Expense & Profit Tracking\n1. Log an Expense\n2. Log a Sale\n3. View Transaction Summary`;
      break;

    case '1*1':
      response = 'CON Enter expense amount:';
      break;

    default:
      const inputArray = text.split("*");

      if (inputArray[0] === '1' && inputArray[1] === '1' && inputArray[2]) {
        const expenseAmount = inputArray[2];
        response = `END Expense of MWK ${expenseAmount} logged successfully.`;
      } else if (text === '2') {
        response = `CON Trade Information\n1. Tariffs & Duties\n2. Exchange Rates\n3. Border Regulations`;
      } else if (text === '3') {
        response = `CON Report Incident\n1. Report Gender-Based Violence\n2. Report Harassment/Bribery\n3. Report Other Issues`;
      } else if (text === '4') {
        response = 'END For assistance, contact support at +265 123 456 789.';
      } else {
        response = 'END Invalid option. Please try again.';
      }
  }

  res.set('Content-Type', 'text/plain');
  res.send(response);
});

app.listen(port, () => {
  console.log(`USSD service running on port ${port}`);
});

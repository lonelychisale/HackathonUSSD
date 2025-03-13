
const app = require("express")();
const bodyParser = require("body-parser");
const logger = require("morgan");


const { response } =  require("express");






let phone = `+265995537312`;


// async function handleUSSDRequest() {
//   try {
//     const isRegistered = await checkNumberRegistration();

//     if (isRegistered) {
//       // The number is registered in Firebase
//       console.log('Number is registered');
//       // Display the desired USSD response
     
//     } else {
//       // The number is not registered in Firebase
//       console.log('Number is not registered');
//     }

//     // Send the USSD response back to the user
    
//   } catch (error) {
//     console.error('Error handling USSD request:', error);
//     // Send an error response to the user
//   }
// // }
// handleUSSDRequest()








// newregref.child('+265995434579').once('value')
//   .then((snapshot) => {
//     var numbers = snapshot.val();
//    if(numbers===null){
//     console.log('you have not registered')
//    }
//    else{
//     console.log('you are registered')
//    }

//   });





const port = process.env.PORT || 3020;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("*", (req, res) => {
  res.send("USSD deployed successfully");
});

app.post("*", async(req, res) => {
  let { sessionId, serviceCode, phoneNumber, text, response } = req.body;
  //creating an array of data
  let dataarray = text.split("*");


  //array length
  let dataarraysize = dataarray.length;


  var currentDate = new Date();
  var timestamp = currentDate.toISOString();





  //......................................first menu...........................................
  if (text == "" ) {
    
    response = `CON Welcome to Farm Radio Trust Test
      1.Register
      2.Main Menu
      3.Help`

  }
 
 
  














 
  




  //...................................working on help menu.............................................
  else if (text == "3") {

    response = `CON choose options below for help
		1.call center`;

  } 
  
  
  else if (text == "3*1" ) {

    response = `END contact for free on *8111# AIRTEL or *7111# TNM `;

  }


  
  
  

  else{

    response = `END invalid input`
  }
   text = dataarray.join('*')
  //......................................send the response back.................................
  res.set("Content-Type: text/plain");
  res.send(response);
  
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
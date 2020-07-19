// define variables that reference elements on our page
const getQForm = document.forms[0];
const processQForm=document.forms[1];
const resultsList = document.getElementById("results");
let start;
let ansL=[];


function displayAllData(){
  console.log("Display All Temperature function");
  // parse our response to convert JSON
  //the this refers to XMLHttpRequest.responseText
  let rows = JSON.parse(this.responseText);
  //console.log("display",dbresults);
  //iterate through the results
  
  rows.forEach (displayQ);

  function displayQ(row,q){
    ansL.push(row['corrOpt'])
    document.getElementById("NumqidID"+(q+1)).innerText=row['qid'];
    document.getElementById("qtxtID"+(q+1)).innerText=row['qtxt'];
    document.getElementById("qidID"+(q+1)).options[0].innerText=row['qopt1'];
    
    for (var i = 0; i < 4; i++) {
    document.getElementById("qidID"+(q+1)).options[i].innerText=row['qopt'+(i+1)];
    }
  }
console.log("ans",ansL)
start= performance.now()
 
};




function getAllQuestions(){
  console.log("All Questions handler function")
  //request the data from the database
  let requestMsg = new XMLHttpRequest();
  requestMsg.addEventListener("load",displayAllData);
  requestMsg.open('get', '/getQ');
  requestMsg.send();
};


//listener function
// listen for the form to be submitted
getQForm.onsubmit = event => {
  // stop our form submission from refreshing the page
  event.preventDefault(); 
  // reset the results section ready for current results


  
    getAllQuestions()

  
};


// listen for the form to be submitted
processQForm.onsubmit = event => {
  // stop our form submission from refreshing the page
  event.preventDefault(); 
  // reset the results section ready for current results
// get the time taken in seconds
let stop=performance.now();
let time = (stop-start)/1000;
  console.log("time",time);
  
// calculate the score
let score = 0 ;
for (var i = 0; i < 3; i++) {
  let optNum=processQForm["qansN"+(i+1)].value[3]
  if(optNum==(ansL[i].toString()))
    {score++}
  
    } ;
  
console.log("score",score);
  
console.log("user",0)
    

  
};

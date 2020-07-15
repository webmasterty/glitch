// define variables that reference elements on our page
const choiceForm = document.forms[0];
const choiceInput = choiceForm.elements["choice"];
const resultsList = document.getElementById("results");

// initialise the results lists
let yearList =[];
let valueList=[];

// database results
let dbresults;

//dummy hardcoded data
let dbresults_dummy ={
  temp_year:2030,
  temp_value:30.26
};

var Plotly;

// event-handler functions
function drawPlotly(){
  console.log("drawing graph")
  

  
  let trace = {
    x:yearList,
    y:valueList,
    type:"scatter",
    //mode:'lines+markers'
  };
   
  let trace1 = {
    x:[yearList[0],yearList[yearList.length-1]],
    y:[valueList[0],valueList[valueList.length-1]],
    type:"scatter",
    //mode:'lines+markers'
  };
  
  let data = [trace, trace1];
  
  let layout={
    title:'Temp graph',
    autosize: true,
    xaxis:{title:'year'},
    yaxis:{title:'temperatures'}
  };
  
  //Plotly.plot('plotlyGraph',data,layout);
  Plotly.newPlot('plotlyGraph', data, layout, {responsive: true});
  
};

function displayValueResult(temp_value,classifier){
  console.log("Displaying a result including just a temperature value");
  console.log(temp_value,classifier);
  // append to the html document
  let newListItem=document.createElement("li");
  newListItem.innerText="The "+classifier+" temperature was "+temp_value.toString();
  resultsList.appendChild(newListItem);
}

function displayYearValueResult(temp_year,temp_value,classifier){
  console.log("Displaying a result including the year and a temperature value");
  console.log(temp_year, temp_value,classifier);
  // append to the html document
  let newListItem=document.createElement("li");
  newListItem.innerText="The "+classifier+" temperature was "+temp_value.toString();
  newListItem.innerText+=" and this happened in "+temp_year.toString();
  resultsList.appendChild(newListItem);
}




function displayAllData(){
  console.log("Display All Temperature function");
  // parse our response to convert JSON
  dbresults = JSON.parse(this.responseText);
  //iterate through the results
  dbresults.forEach(function(row){
    displayYearValueResult(row['Year'],row['Temp'],"");
    yearList.push(row['Year']);
    valueList.push(row['Temp']);
  }); 
  console.log(yearList, valueList)
  drawPlotly();
}




function getAllTemperature(){
  console.log("All Temperature handler function")
  //request the data from the database
  let requestMsg = new XMLHttpRequest();
  requestMsg.addEventListener("load",displayAllData);
  requestMsg.open('get', '/getAllData');
  requestMsg.send();
};


//listener function
// listen for the form to be submitted
choiceForm.onsubmit = event => {
  // stop our form submission from refreshing the page
  event.preventDefault(); 
  // reset the results section ready for current results
  resultsList.innerHTML = "";
  yearList =[];
  valueList=[];
  
  // Call the appropriate handler function
  if (choiceInput.value=="maxTemp"){}
 else {
    getAllTemperature()
  };
  
  //reset form ready for a future choice
  choiceInput.value="";
};

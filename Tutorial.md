# Revision of ALT1 - a website interacting with an SQL database

This tutorial covers the creation of an interactive website including retrieval of data from a relational database (sql). The database contains existing data produced from an ALT2 revision tutorial.

Use this link to see the final solution: [https://alt1-revision-staged.glitch.me](https://alt1-revision-staged.glitch.me)  
Remix a copy for yourself to walk through the stages of how it was created.

When you remix the project you will get a copy of the finished artefact. However, it is important to understand the design process and testing methodologies used whilst developing the artefact originally. Hence, this tutorial will take you through the design process in stages.



## Design Approach 

We begin with a basic SQLite project taken from the Glitch service provider which we then strip down to the absolute basics before building back up in stages. At each stage, versions are maintained of each of the main files in the project. This allows the programmer to roll-back to an earlier stage if required.

Note that an agile testing method is being used through the inclusion of testing at all steps in the process.

### Originally:

- index.html – original
- style.css – original
- client.js – original
- sqlite.db - original
- erver.js - original

### Stage 0:

Strip the original files down to the basics needed to begin the project.

- index.html – contains just a basic form for the user interface including a submit button, and a basic section where the results will be displayed as an unordered list.
- style.css – original
- client.js – totally empty, this file will be rewritten entirely from scratch.
- sqlite.db - original
- server.js – contains only the connections needed to access the database sqlite.db, the basic routing function to launch index.html, a basic helper function to clean strings, a basic listener function to listen for requests.

### Stage 1:

Develop the user interface in the index.html file.

- index.html – The user interface from stage 0 has been altered. Instead of user input via a text box, we are now using user input via radio buttons. The results section has been renamed. All other areas of the file are unchanged.
- style.css – original
- client.js – unchanged from stage 0
- sqlite.db - original
- server.js – unchanged from stage 0

### Stage 2:

Develop the client-side javascript to listen for the user form to be submitted and to respond appropriately using hardcoded dummy data. Actual data will be added at a later stage.

- index.html – unchanged from stage 1
- style.css – original
- client.js – contains a listener function which calls a handler function, according to the user’s choice. The handler functions in turn call event-handler functions which will post some dummy data to the html document.
- sqlite.db - original
- server.js – unchanged from stage 0

### Stage 3:

Develop the database.

- index.html – unchanged from stage 1
- css – original
- client.js – unchanged from stage 2
- sqlite.db – original, but no longer needed.
- server.js – refers to the database called “temperature_database.db” instead of the original sqlite.db database.
- temperature_database.db - database created, table created and populated using data and a sql script produced by a python program.
- annual_temp_cleaned.csv – a datafile containing cleaned data
- GenerateSQL.py – a python file used to generate the sql file called SetUpDatabase.txt
- SetUpDatabase.txt – an sql file used to create and populate the database table “temperatures”.

### Stage 4:

Develop the server side javascript to include hander functions which select data from the database and send it back to the client.js as stringified JSONs.

- index.html – unchanged from stage 1
- style.css – original
- client.js – unchanged from stage 2
- server.js – includes some handler functions responding with the data from the database.

### Stage 5:

Develop the client side javascript to include requests to the server.js for the actual data and then update the handler functions to post the actual data to the html document (rather than the dummy data) .

- index.html – unchanged from stage 1
- style.css – original
- client.js – functions updated to include http requests, actual data appended to website rather than dummy data.
- server.js – unchanged from stage 4

### Stage 6:

Develop the “All temperatures” choice to display a graph in addition to the data already displayed.

- index.html – includes the plotly module and a section for displaying the graph.
- style.css – original
- client.js – “All” data function updated so that it populates a lists with the temperatures and then uses those lists to draw the graph.
- server.js – unchanged from stage 4

## Design Stages

### Originally

1. Create a new glitch SQLlite project and make duplicates of each of the 4 main files (html, css, client.js and server.js) rename each duplicate as the original version. For example, the duplicate of “index.html” should be named “index.html original”.

### Stage 0

In this stage we will strip the original files down to the basics needed to begin the project.

1. “server.js” is used to drive the entire project. Strip it down to the minimum required. Do this by:

- Removing the code to get dreams, add dreams and clear dreams; lines 53 through 100.
- Removing the code to create and populate the dreams table; lines 24 through 46.
- Remove everything from client.js so the file is completely empty.

3. Update the meta data in index.html and remove the unnecessary parts from the body. Do this by:

- Changing the title in line 7.
- Either remove or update the icon on line 9.
- Make any changes you want to the meta tags on lines 10, 11 and 12, or remove if you want.
- Update the header; line 23.
- Remove the paragraphs; lines 28 and 30.
- Remove the button to clear dreams; lines 39 through 41.

4. Test your changes in the browser. You should have a basic form. This form should do nothing though as the client-side javascript has been removed.

5. Make duplicates of the 3 main files altered during this stage (html, client.js and server.js). Rename each duplicate as version 0. For example, the duplicate of “index.html” should be named “index.html version 0”.

### Stage 1

In this stage we will develop the user interface in the index.html file.

1. Update the lines containing the <form> tag in the index.html file to change the user interface from text entry to a choice using radio buttons. Do this by:

- Changing the < input> name attribute from name=“dream” to name=“choice”.
- Changing the < input> type attribute from type=“text” to type=“radio”.
- Add a value attribute to the < input> tag, value=”maxTemp”.
- After the <input> tag (i.e. after the closing angle bracket) add the words to be displayed for the user and a line break; Warmest Year <br>.
- Remove any unneeded attributes.

The final line of code should look like this:

          <input name="choice" type="radio" value="maxTemp">Warmest Year<br>

Look at the output in your browser to test your changes.

2. Duplicate the <input> line of code for the other choices: minTemp, avgTemp, allTemp. Test your changes.

3. Change the id attribute of the submit <button> from id=”submit-dream” to id=”submit_choice”. Likewise change the displayed words from Dream to Choice. The final line of code should look like this:

          <button type="submit" id="submit-choice">Submit Choice</button><br>

Test your changes.

4. Update the lines containing the <section> tag in the index.html file to change the class name and id name from “dreams” to “results”. The final lines of code should look like this:

          <section class="results">
            <ul id="results"></ul>
          </section>
  
  

  
5.	Make a duplicate of the index.html file and rename the duplicate as “index.html version 1”.

### Stage 2

In this stage we will develop the client-side javascript to listen for the user form to be submitted and to respond appropriately using hardcoded, dummy data. Actual data will be added at a later stage.

1. Add code to the client.js file to define variables that reference the elements in the index.html file. Do this by copying lines 8 through 11 from “client.js original” into client.js and editing them so that they refer to “choice” instead of “dream” and “results” instead of “dreams”. The final lines of code should look like this:

        // define variables that reference elements on our page
        const choiceForm = document.forms[0];
        const choiceInput = choiceForm.elements["choice"];
        const resultsList = document.getElementById("results");


2. Add a listener function to client.js for the submit button:

        // listen for the form to be submitted
        choiceForm.onsubmit = event => {
        // stop our form submission from refreshing the page
        event.preventDefault();
        };

Test your changes. Clicking on the submit button should have no discernible impact at this stage.

3. When the button is submitted the first thing we want to happen is the results (if any) already in the results section of the html document should be cleared, ready for the new results to be displayed. The last thing to happen is the users choice should be reset so they can choose again. The other jobs that the listener function will do will be added between these two actions. Add this code to the listener function:

        // reset the results section ready for current results
        resultsList.innerHTML = “”;
        //reset form ready for a future choice
        choiceInput.value="";


4. The listener function should call handler functions depending on what it heard. For example, if the user’s choice was maxTemp then a handler function called getMaxTemperature() should be called. Add an if construct to the listener function to call appropriate functions. This should complete the listener function. No further changes should be needed to it.

        // Call the appropriate handler function
        if (choiceInput.value=="maxTemp"){
          getMaxTemperature();
        } else if (choiceInput.value=="minTemp"){
          getMinTemperature();
        } else if (choiceInput.value=="avgTemp"){
          getAvgTemperature();
        } else {
          getAllTemperature()
        };

These handler functions don’t yet exist, therefore you will receive error messages. Check that they only refer to the fact that they don’t exist and not to other problems in your code.

5. Add basic handler functions above the listener function. For example:

          function getMaxTemperature(){
            console.log("Maximum Temperature handler function")
          };

Test your changes by inspecting the console.

6. Once completed the getMaxTemperature() function will send a http request to the server.js to find out the result of the maximum temperature query. On receiving the response the getMaxTemperature() function will launch another function - the event-handler function. The event-handler function in turn will display the result in the results section of the html document. At this stage in our development we are going to skip over the http request and hardcode in a dummy response instead. In your declarations section create a dummy result “dbresults_dummy” which is initialised to be a javascript object with two number attributes. Declare the actual dbresults at this stage too – even though not used yet.

          //dummy hardcoded data
          let dbresults_dummy ={
          temp_year:2030,
          temp_value:30.26;
          
          let dbresults;

7. Create a basic event-handler function displayMaxData() and update the getMaxTemperature() function to call it. Test your changes by inspecting the console.

8. The displayMaxData() function must take the dummy result and append it to the <ul> in the results section of the html in an appropriate manner. For example the <li> might be formatted as “The maximum temperature was 30.26 and this occurred in 2030”. In order to reuse code we should recognise that the displayMinData() function will behave similarly – maximum replaced with minimum. Likewise, the displayAllData() function will behave similarly – maximum replaced with blank. The displayAvgData() function will differ as there is no year to display. Therefore it would be better to design the displayMaxData() function to call another function displayYearValueResult() which can be reused by some of the other functions. Add a basic displayYearValueResult() function above the displayMaxData() function and add a line to the displayMaxData() function to call it and pass to it the values of temp_year, temp_value and “maximum”. Test your changes using the console.

          // event-handler functions
          function displayYearValueResult(temp_year,temp_value,classifier){
            console.log("Displaying a result including the year and a temperature value");
            console.log(temp_year, temp_value,classifier);
          }
          
          function displayMaxData(){
            console.log("Display Maximum Temperature function");
            displayYearValueResult(dbresults_dummy.temp_year,dbresults_dummy.temp_value,"maximum");
          }

9. Within the displayYearValueResult() function declare a local variable for the <li> element. Update the innerText of the element and add it to the html document.

          // event-handler functions
          function displayYearValueResult(temp_year,temp_value,classifier){
            console.log("Displaying a result including the year and a temperature value");
            console.log(temp_year, temp_value,classifier);
            // append to the html document
            let newListItem=document.createElement("li");
            newListItem.innerText="The "+classifier+" temperature was "+temp_value.toString();
            newListItem.innerText+=" and this happened in "+temp_year.toString();
            resultsList.appendChild(newListItem);
          }
          
          function displayMaxData(){
            console.log("Display Maximum Temperature function");
            displayYearValueResult(dbresults_dummy.temp_year,dbresults_dummy.temp_value,"maximum");
          } 

Test your changes in the browser. The dummy result should now appear in the results list.

10. Add other functions for the min, avg and all data as appropriate. Remember to call the functions. Test your results in the browser.

11. Make a duplicate of the client.js file and rename the duplicate as “client.js version 2”.

### Stage 3:

In this stage we will develop the database – “temperature_database.db”. We will use the following files:

- annual_temp_cleaned.csv – can be found in the assets folder on Glitch
- GenerateSQL.py – can be found in the assets folder on Glitch
- SetUpDatabase.txt – can be found in the file list on Glitch

  The annual_temp_cleaned.csv file is used as input to the GenerateSQL.py program. This python program outputs the file SetUpDatabase.txt. The development of these files is beyond the scope of this tutorial. The steps below describe how the database was created and populated and how to edit the server.js to refer to it.

1. Open the console in full screen. At the \$ prompt switch to sqlite3 naming the new database carefully by typing the following:

          \$sqlite3 temperature_database.db;

2. At the sqlite prompt type the command to run the set up file:

          sqlite> .read SetUpDatabase.txt

3. Check that the database has been set up correctly by typing a select statement at the sqlite prompt:

          sqlite> select \* from temperatures;

4. Close the console screen.

5. Change line 19 of the server.js to point to this new database:

          const dbFile = "temperature_database.db";

6. Make a duplicate of the server.js file and rename the duplicate as “server.js version 3”.

### Stage 4:

In this stage we will develop the server side javascript to include hander functions which select data from the database and send it back to the client.js as stringified JSONs. Note that the client.js is currently not requesting anything from the server.js. Therefore, testing will be postponed until stage 5.

1. In server.js - after the basic routing function, and above the helper functions - add a section for handler functions and include the function below.

          //handler functions
          app.get("/getAllData",(request,response)=>{
            db.all("SELECT \* FROM temperatures;",(err,rows)=>{
              response.send(JSON.stringify(rows));
            });
          });

This function retrieves all the records from the table “temperatures” and stores them in “rows”. If there are any errors found they will be stored in “err”. The rows (if any) will be packaged up as a JSON package containing one long string and sent back to the requesting function as the “response” to their “request”.

2. Create similar handler functions for Min, Max and AVG but note that the SQL of these functions will differ as they use aggregate functions. For example:
   
          SELECT *
          FROM temperatures
          WHERE temp_value = 
            (SELECT MAX(temp_value) AS temp_value
            FROM temperatures);

3. Make a duplicate of the server.js file and rename the duplicate as “server.js version 4”.

### Stage 5:

In this stage we will develop the client side javascript to include requests to the server.js for the actual data and then update the handler functions to post the actual data to the html document (rather than the dummy data) .

1. Update the getMaxTemperature() function to include a HTTP request. The request is to run the get function getMaxTemperature which is in server.js. The function should listen for a response to this request and then it should call the displayMaxData() function to handle the response once it has been received.

          function getMaxTemperature(){
            console.log("Maximum Temperature handler function");
            //request the data from the database
            let requestMsg = new XMLHttpRequest();
            requestMsg.addEventListener("load",displayMaxData);
            requestMsg.open('get', '/getMaxData');
            requestMsg.send();
          };

2. The displayMaxData() function now needs to be altered to handle a JSON object instead of using the dummy data as it currently does. The JSON object will need to be un-packaged. Inside the package could be a number of rows of results from the database table. For example, two different years may both have the same temperature. Each row will need to be processed separately. With JSON packages this means that the processing function displayYearValueResult() will need to be moved inside a function and the values for temp_year and temp_value will be accessed slightly differently.

          function displayMaxData(){
            console.log("Display Maximum Temperature function");
            // parse our response to convert JSON
            dbresults = JSON.parse(this.responseText);
            //iterate through the results
            dbresults.forEach(function(row){
              displayYearValueResult(row['temp_year'],row['temp_value'],"maximum");
            });
          }

Test your changes in the browser. You might discover some bugs in the server.js code as it wasn’t tested at stage 4. If you do, remember to fix the bug in both server.js and in “server.js version 4”.

There is a glitch with Glitch in that sometimes it can take a while for file changes in the editor to be synced up. An error message such as “unexpected end of JSON input” means that “row” was empty. There were no rows being passed back. The app is likely still connected to sqlite.db rather than temperature_database.db. To manually force a refresh (and force the sync) go into the console via the logs – not the fill screen console – and type the word refresh. Following this you should see the temperature_database.db listed in your file list.

3. Make similar changes to the other functions.

4. Make a duplicate of the client.js file and rename the duplicate as “client.js version 5”.

### Stage 6:

In this stage we develop the “All temperatures” choice to display a graph, in addition to the data already displayed.

1. Add a <script> tag to the <head> section of the html file to import the Plotly library.

          <script src="https://cdn.plot.ly/plotly-1.2.0.min.js"></script>

2. Add a <div> tag before the closing </main> tag for displaying the graph.

          <div id="plotlyGraph" style="width: 90%"></div>

3. Initialise the results data as two empty lists: one to contain a list of the values of the temperatures and one to contain a list of the years in which those temperatures occurred. Also add a variable for storing the Plotly object. This needs to be declared using var rather than let Add this code to the declaration section at the top of client.js.

          // initialise the results lists
          let yearList =[];
          let valueList=[];
          var Plotly;

These will two lists be populated with the results and will need to be emptied (same as the results section) every time the user makes a new choice. Therefore they should be reset to empty lists in the listener function at the same that the results list is being reset. Add appropriate code to the listener function to do this. Test your changes – there should be no discernible difference at this stage.

4. The lists will be populated as the JSON package is being unpacked. So alter the forEach() function within the displayAllData() function to do this. Also add a call to drawPlotly() function following the forEach() function.

          function displayAllData(){
            console.log("Display all the Temperatures function");
            // parse our response to convert JSON
            dbresults = JSON.parse(this.responseText);
            //iterate through the results
            dbresults.forEach(function(row){
              displayYearValueResult(row['temp_year'],row['temp_value'],"");
              yearList.push(row['temp_year']);
              valueList.push(row['temp_value']);
            });
            drawPlotly()
           }

5. Add a basic drawPlotly() function at the top of the handler functions:

          // event-handler functions
          function drawPlotly(){
            console.log("drawing graph")
          };

6. Update the drawPlotly() function to create the objects needed and to produce the graph. Be sure to use the id set up in the html file; i.e. plotlyGraph.

          // event-handler functions
          function drawPlotly(){
            console.log("drawing graph")
            let trace = {
              x:yearList,
              y:valueList,
              type:"scatter",
              };
            let trace1 = {
              x:[yearList[0],yearList[yearList.length-1]],
              y:[valueList[0],valueList[valueList.length-1]],
              type:"scatter",
            };
            let data = [trace, trace1];
            let layout={
              title:'Temp graph',
              autosize: true,
              xaxis:{title:'year'},
              yaxis:{title:'temperatures'}
            };
            Plotly.newPlot('plotlyGraph', data, layout, {responsive: true});
          };

7. Make duplicates of the index.html file and the client.js file and rename the duplicates as version 6.

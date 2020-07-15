"""
We begin this tutorial using the cleaned data from an earlier
tutorial (ALT2 Revision Tutorial)  "annual_temp_cleaned.csv".

Using this data  we will produce a second file called
"setUpDatabase.txt".  This file can be used to create a
SQLlite3 database and populate the database with the data from
the .csv file.

The database, generated later, will become part of an interactive
website.
"""
import csv

globalTempYears = []
globalTempValues = []

def readInFile (globalTempYears, globalTempValues):
    with open("annual_temp_cleaned.csv") as csv_file:
        csv_reader=csv.reader(csv_file,delimiter=',')
        for row in csv_reader:
            globalTempYears.append(int(row[0]))
            globalTempValues.append(float(row[1]))
        print("Read in file successfully")
        return

readInFile(globalTempYears,globalTempValues)
print(globalTempYears)
print(globalTempValues)


def writeToFile (globalTempYears, globalTempValues):
    with open("SetUpDatabase.txt",  "w") as sql_file:
        
        sql_file.write("DROP TABLE IF EXISTS temperatures; \n\n")
        
        sql_file.write("CREATE TABLE IF NOT EXISTS temperatures \n \t (temp_year INTEGER, \n \t temp_value NUMBER); \n\n")
        
        sql_file.write("INSERT INTO temperatures \n \t (temp_year, \n \t temp_value) \n VALUES \n")
        for row in range(len(globalTempYears)-1):
            sql_file.write( "\t (" + str(globalTempYears[row]) + "," + str( globalTempValues[row]) + "), \n" ) # comma
        sql_file.write( "\t (" + str(globalTempYears[-1]) + "," + str( globalTempValues[-1]) + ");" ) # semicolon
        print("File created successfully")
        return

writeToFile(globalTempYears,globalTempValues)


                       


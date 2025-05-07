/*
Class Description: 
    - 

Contributors: 
    - Jorge Arias
    - Anthony Gonzalez
*/

import db from './services/db.js'; //Imports the export functions to connect to MongoDB

//A test function to see if the database connection is working
export const testDatabaseConnection = async() => 
{
    try
    {
        //Connects to MongoDB (database)
        await db.connect();
    }
    //Displays an error when connecting to or interacting with MongoDB
    catch(error)
    {
        console.error(error);
    }
    //Closes the connection to MongoDB
    finally
    {
        //Closes the connection to MongoDB after inserting into db
        await db.close();
    }
}

testDatabaseConnection();
/*
Class Description: 
    - 

Contributors: 
    - Jorge Arias
    - Anthony Gonzalez
*/

import express from 'express';
import dotenv from 'dotenv';
import db from './services/db.js'; //Imports the export functions to connect to MongoDB
import artistRouters from './routes/artist.js';
import historyRouters from './routes/history.js';

//A test function to see if the database connection is working
export const runServer = async () => {
    //Declare the server here so it's accessible in finally block after being set up in the try block
    let server;

    try {
        //Connects to MongoDB (database)
        await db.connect();

        dotenv.config();

        const app = express();
        const PORT = process.env.PORT || 3000;

        //Middleware to parse JSON
        app.use(express.json());

        //Mount the artist routes
        app.use('/artist', artistRouters);
        //Mount the history routes
        app.use('/history', historyRouters);

        //Assigns the server variable and starts the server itself
        server = app.listen(PORT, () => {
            console.log(`✅ Server running at http://localhost:${PORT}`);
        });
    }
    //Displays an error when connecting to or interacting with MongoDB
    catch (error) {
        console.error(error);
    }
    //Closes the connection to MongoDB
    finally {
        // Waits 10 seconds before closing the DB & server to allow time for operations
        setTimeout(async () => {
            console.log("MongoDB connection & Express server closed after 10 seconds.");

            //Closes the connection to MongoDB
            await db.close();

            //Closes the connection to the server
            server.close();
        }, 200000);
    }
}

runServer();
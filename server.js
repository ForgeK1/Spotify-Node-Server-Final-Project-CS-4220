/*
Class Description: 
    Sets up the connections/routes that the api utilizes and have the database listen to the incoming data.
    We also have the 2 different ways to sutdown the connection: manual interupption and connection termination

Contributors: 
    - Jorge Arias
    - Anthony Gonzalez
*/
//imports
import express from 'express';
import dotenv from 'dotenv';
import db from './services/db.js'; 
import artistRouters from './routes/artist.js';
import historyRouters from './routes/history.js';

//load env vars 
dotenv.config();
//grab the reliable port number based on the env file or sets it manually
const PORT = 3000;

//create the express app instance 
const app = express();
//IDK IF NEEDED: parse the JSONs when needed -> using middleware from express
app.use(express.json());

//handle requests to the root url -> localhost: PORT
app.get('/',(req,res)=>{
    res.send('Welcome to the Spotify Artist History Tracker App');
});

//use different routers for specific routes -> currently atrist and history

//user artists router for routes starting with /artist
app.use('/artist',artistRouters);
//user history router for routes starting with /history
app.use('/history',historyRouters);

//finally can start the server and connect to the db
//start server with command: npx run dev
const server = app.listen(PORT,async()=>{
    try {
        //waits on a connection and displays a confirmation
        await db.connect();
        console.log(`Server is listening on port ${PORT}`);
        
    } catch (error) {
        //if we cannot connect to the db we send the error msg
        console.log(`Failied to connect to DB:`,error);  
        //in an error occurs we dont wanna continue letting the app run so
        //shunt down after error msg
        process.exit(1);
    }
    
});

//sutdown function that will be called based on manual interuption or termination 
// -> ctrl + c and etc or proccess shutdown
const shutdown = async () => {
    //await the closing of the mongo db connection
    await db.close();
    //close the server after db connection is gone
    server.close(() =>{
        console.log('Server shutdown');
        process.exit(0);
    });
};

//provide actual uses of the shutdown func like said previously: manual interrupt/terminate
process.on('SIGINT',shutdown);
process.on('SIGTERM',shutdown);
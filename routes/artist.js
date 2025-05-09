/*
Class Description: 
    - 

Contributors: 
    - Keyvan M. Kani
    - MD Islam
*/

import express from 'express'; //Imports Express to create a router and define route handlers
import { searchByName, getByID } from '../services/api.js'; //Imports Spotify API functions like searchByName and getByID
import db from '../services/db.js'; //Imports MongoDB functions to log search and selection

//Creates a new Express router instance to define and handle routes
const router = express.Router();

/*A router that grabs the requested artist (via name) by interacting with the Spotify API, creates a 
  JSON object that contains the artist's name and ID, and saves it to the Spotify database in MongoDB

    Examples: 
        GET /artist?name=drake
        GET /artist?name=Kendrick
        GET /artist?name=Bruno Mars*/
router.get('/', async(req, res) => 
{
    try
    {
        //Extracts name from the query parameter from the request
        const { name } = req.query;

        //Aquires a JSON object containing all the information about the artist
        const artistInfo = await searchByName(name);

        //Grabs the first matching artist
        const firstArtist = artistInfo.artists.items[0];

        //Creates a new minimal and clean JSON object containing two keywords for the artist
        const results = 
        {
            display: firstArtist.name,
            identifier: firstArtist.id
        };

        //Saves the artist info under the SearchHistoryKeyword collection in the Spotify database
        db.insert('SearchHistoryKeyword', results);

        /*Returns the artist information (this line can be removed if showcasing the results
          is unnecessary)*/
        return res.json(results);
    }
    //Displays any potential errors when grabbing and saving the artist info
    catch(err)
    {
        res.status(500).json({ err });
    }
});

/*A router that ...

    Examples: 
        ...
        ...
        ...*/
// router.get(':id', async(req, res) => 
// {

// }

//Exports the router to utilize its handlers
export default router;
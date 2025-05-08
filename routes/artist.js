/*
Class Description: 
    - 

Contributors: 
    - Keyvan M. Kani
    - MD Islam
*/

import express from 'express';          //Imports Express to create a router and define route handlers
import { searchByName, getByID } from '../services/api.js';   //Imports Spotify API functions like searchByName and getByID
import db from '../services/db.js';     //Imports MongoDB functions to log search and selection

//Creates a new Express router instance to define and handle routes
const router = express.Router();

//Example: GET /artist?name=drake
router.get('/', async(req, res) => 
{
    try
    {
        //Extracts name from the query parameter from the request
        const { name } = req.query;

        //Aquires a JSON object containing all the information from the artist
        const artistInfo = await searchByName(name);

        // Grabs the first matching artist
        const firstArtist = artistInfo.artists.items[0];

        //Creates a new minimal and clean JSON object containing two keywords for the artist
        const results = 
        {
            display: firstArtist.name,
            identifier: firstArtist.id
        }

        //console.log(artistInfo);

        return res.json(results);
    }
    catch(err)
    {
        res.status(500).json({ err });
    }
});

export default router;
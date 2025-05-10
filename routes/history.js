/*
Class Description: 
    - In this history.js file, our goal is to use the express router to define our routes to the keyword and
    selection history. We plan to grab different types of history located in the Mongo Database. After
    receiving the raw json from the database, we can then reformat it and return our newly formatted json
    to the called location.

Contributors: 
    - Johny Vu
    - Sanskar Thapa
*/

import express from "express";
import db from "../services/db.js";

//uses express router to define and handle routes
const router = express.Router();

router.get("/keywords", async (req, res) => {
  try {
    //list to return results
    let results = [];
    //looks in the database for any 'SearchHistoryKeywords' tables
    const dbFindings = await db.find("SearchHistoryKeyword");

    //checks if the table exists
    if (dbFindings) {
      //converts all the raw json into a list
      const keywordHistory = await dbFindings.toArray();

      //checks every keyword in the history found in the database
      for (let i = 0; i < keywordHistory.length; i++) {
        const currentKey = keywordHistory[i];

        //pushes formatted json the to results array
        results.push({
          display: currentKey.display,
          identifier: currentKey.identifier,
        });
      }
    }

    return res.json(results);
  } catch (err) {
    //Displays any potential errors when grabbing and saving the artist info
    res.status(500).json({ err });
  }
});

router.get("/selections", async (req, res) => {
  try {
    //list to return results
    let results = [];
    //looks in the database for any 'SelectionHistory' tables
    const dbFindings = await db.find("SelectionHistory");

    //checks if the table exists
    if (dbFindings) {
      //converts all the raw json into a list
      const keywordHistory = await dbFindings.toArray();

      //checks every keyword in the history found in the database
      for (let i = 0; i < keywordHistory.length; i++) {
        const currentKey = keywordHistory[i];

        //pushes formatted json the to results array
        results.push({
          display: currentKey.display,
          identifier: currentKey.identifier,
        });
      }
    }

    return res.json(results);
  } catch (err) {
    //Displays any potential errors when grabbing and saving the artist info
    res.status(500).json({ err });
  }
});

//Exports the router to utilize its handlers
export default router;

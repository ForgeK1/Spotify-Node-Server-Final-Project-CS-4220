# Spotify Node Server Final Project (CS-4220)

# Description
This project is a Node.js server application that allows users to search for artists using the Spotify Web API and log their search and selection history in a MongoDB database. The application supports two primary search methods: searching by artist name and retrieving artist details by ID. Logged interactions are stored and can be retrieved for review through history endpoints.

# How to run
1. Run npm install to install the required packages
   
3. Create a .env file and add your MongoDB and Spotify API credentials
   
4. Start the server by running: node server.js
   
5. Use a browser or test script (like test_artist.js) to hit routes:
- GET /artist?name=Bruno Mars
- GET /artist/:id
- GET /history/keywords
- GET /history/selections

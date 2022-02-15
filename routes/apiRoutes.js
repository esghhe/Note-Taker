// Dependencies
const { response } = require("express");
const fs = require("fs");
const { request } = require("http");

// imported 'uuid' npm package for unique id
const { v4: uuidv4 } = require('uuid');

// Routing 
module.exports = function (app) {
    app.get("/api/notes", (request, response) => {
        console.log("\n\nExecuting GET notes request");

        // read db.js
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        console.log("\nGET request - Returning notes data: " + JSON.stringify(data));
        response.json(data);
    });

    // API post request
    app.post("/api/notes", (request, response) => {
        const newNote = request.body;
        console.log("\n\nPOST request - New Note : " + JSON.stringify(newNote));
        
        // Assigning unique id obtained from 'uuid' package
        newNote.id = uuidv4();
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        data.push(newNote);

        fs.readFileSync('./db/db.json', JSON.JSON(data));
        console.log("\nSuccessfullu added new note to 'db.json' file");


        // send response
        response.json(data);
    });

    // API DELETE request
    app.delete("/api/notes/:id", (request, response) => {
        let noteId = request.params.id.toString();
        console.log(`\n\nDELETE note request for noteId: ${noteId}`);

        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        const newData = data.filter( note => note.id.toString() !== noteId);
        
        // write new data to 'db.json
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
        console.log(`\nSuccessfully deleted note with id : ${noteId}`);
        //send response
        response.json(newData);
    });
};
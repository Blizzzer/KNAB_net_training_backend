const DatabaseConnection = require('./repository.js');
const express = require('express');
const config = require('./config');
const router = express.Router();

var connector = new DatabaseConnection(config.DB_CONFIG);

router.route('/')
    .get(async (request, response) => {
        try {
            response.send(
                await connector.getAllTexts()
            )
        } catch (e) {
            console.log(e);
            response.status(403);
            response.send("FAILED");
        }
    })
    .post(async (request, response) => {
        let author = request.body.author;
        let text = request.body.text;
        let board_id = request.body.board_id;
        try {
            response.send(
                await connector.createContent(author, text, board_id)
            )
        } catch (e) {
            console.log(e);
            response.status(403);
            response.send("FAILED");
        }
    })
    .patch(async (request, response) => {
        let id = request.body.id;
        let text = request.body.text;
        try {
            response.send(
                await connector.updateText(text, id)
            )
        } catch (e) {
            console.log(e);
            response.status(403);
            response.send("FAILED");
        }
    })
    .delete(async (request, response) => {
        let id = request.body.id;
        try {
            response.send(
                await connector.deleteContent(id)
            )
        } catch (e) {
            console.log(e);
            response.status(403);
            response.send("FAILED");
        }
    });

module.exports = router;
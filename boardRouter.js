const DatabaseConnection = require('./repository.js');
const express = require('express');
const config = require('./config');
const router = express.Router();

const connector = new DatabaseConnection(config.DB_CONFIG);

router.route('/')
    .get(async (request, response) => {
        try {
            response.send(
                await connector.getAllBoards()
            )
        } catch (e) {
            console.log(e);
            response.status(403);
            response.send("FAILED");
        }
    })
    .post(async (request, response) => {
        let name = request.body.name;
        try {
            response.send(
                await connector.createBoard(name)
            )
        } catch (e) {
            console.log(e);
            response.status(403);
            response.send("FAILED");
        }
    })
    .patch(async (request, response) => {
        let id = request.body.id;
        let name = request.body.name;
        try {
            response.send(
                await connector.updateBoard(name, id)
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
                await connector.deleteBoard(id)
            )
        } catch (e) {
            console.log(e);
            response.status(403);
            response.send("FAILED");
        }
    });


module.exports = router;
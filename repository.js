const mysql = require('mysql');
var config = require('./config.js');

module.exports = class DatabaseConnection {
    constructor(config) {
        this.pool = mysql.createPool(config);
    }


    getConnection() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection(function (err, connection) {
                if (err) reject(err);
                resolve(connection);
            })
        })
    }

    //Boards Section
    async getAllBoards() {
        let sqlcon = await this.getConnection();
        return new Promise((resolve, reject) => {
            sqlcon.query("SELECT * FROM board", (err, result, fields) => {
                sqlcon.release();
                if (err) reject(err);
                console.log(result);
                resolve(result);
            });
        });
    }

    async createBoard(name) {
        let sqlcon = await this.getConnection();
        return new Promise((resolve, reject) => {
            sqlcon.query("INSERT INTO board (name) VALUES (?);", [name], (err, result, fields) => {
                sqlcon.release();
                if (err) reject(err);
                console.log(result);
                resolve(result);
            });
        });
    }

    async updateBoard(name, id) {
        let sqlcon = await this.getConnection();
        return new Promise((resolve, reject) => {
            sqlcon.query("UPDATE board SET name = ? WHERE id = ?", [name, id], (err, result, fields) => {
                sqlcon.release();
                if (err) reject(err);
                console.log(result);
                resolve(result);
            })
        })
    }

    async deleteBoard(id) {
        let sqlcon = await this.getConnection();
        return new Promise((resolve, reject) => {
            sqlcon.query("DELETE FROM board WHERE id = ?", [id], (err, result, fields) => {
                sqlcon.release();
                if (err) reject(err);
                console.log(result);
                resolve(result);
            })
        })
    }

    //Text_entry section
    async getAllTexts() {
        let sqlcon = await this.getConnection();
        return new Promise((resolve, reject) => {
            sqlcon.query("SELECT * FROM text_entry", (err, result, fields) => {
                sqlcon.release();
                if (err) reject(err);
                console.log(result);
                resolve(result);
            });
        });
    }

    async createContent(author, text, board_id) {
        let sqlcon = await this.getConnection();
        return new Promise((resolve, reject) => {
            sqlcon.query("INSERT INTO text_entry (author, text, board_id) VALUES (?,?,?);", [author, text, board_id], (err, result, fields) => {
                sqlcon.release();
                if (err) reject(err);
                console.log(result);
                resolve(result);
            });
        });
    }

    async updateText(text, id) {
        let sqlcon = await this.getConnection();
        return new Promise((resolve, reject) => {
            sqlcon.query("UPDATE text_entry SET text = ? WHERE id = ?", [text, id], (err, result, fields) => {
                sqlcon.release();
                if (err) reject(err);
                console.log(result);
                resolve(result);
            })
        })
    }

    async deleteContent(id) {
        let sqlcon = await this.getConnection();
        return new Promise((resolve, reject) => {
            sqlcon.query("DELETE FROM text_entry WHERE id = ?", [id], (err, result, fields) => {
                sqlcon.release();
                if (err) reject(err);
                console.log(result);
                resolve(result);
            })
        })
    }

    async getBoardById(id) {
        let sqlcon = await this.getConnection();
        return new Promise((resolve, reject) => {
            sqlcon.query("SELECT * FROM text_entry WHERE board_id = ?", [id], (err, result, fields) => {
                sqlcon.release();
                if (err) reject(err);
                console.log(result);
                resolve(result);
            })
        })
    }
};




const express = require('express');
const app = express.Router();

const AppController = require('../controllers/appController');

app.get('/get-data', AppController.getRepositoryData);
app.get('/', AppController.home);

module.exports = app;

const express = require('express');
const path = require('path');
const db = require('../database/postgres.js');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, '/../dist')));

app.get('/balance', db.getCurrentBalance);
app.get('/items', db.getItems);


app.listen(port, () => console.log(`listening on port ${port}`));

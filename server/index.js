const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/postgres.js');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, '/../dist')));

app.get('/balance', db.getCurrentBalance);
app.put('/balance/:updatedBalance', db.updateBalance);
app.get('/items', db.getItems);
app.put('/items/:id', db.updateItemQuantity);

app.listen(port, () => console.log(`listening on port ${port}`));

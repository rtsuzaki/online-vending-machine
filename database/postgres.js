const { Client } = require('pg');

const client = new Client({
  user: 'me',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'vendingmachine',
  password: 'password',
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error(`connection error-- the user is ${client.user}`, err.stack);
  } else {
    console.log('connected to postgres database');
  }
});

const getCurrentBalance = (request, response) => {
  client.query('SELECT * FROM balances WHERE id= 1', (error, results) => {
    if (error) {
      console.log('ERROR');
      throw error;
    }
    response.status(200).json(results.rows[0]);
  });
};

const updateBalance = (request, response) => {
  const updatedBalance = request.params.updatedBalance;
  client.query('UPDATE balances SET main_user_balance = $1 WHERE id = 1', [updatedBalance], (error, results) => {
    if (error) {
      console.log('ERROR');
      throw error;
    }
    response.status(200).json(updatedBalance);
  });
};

const getItems = (request, response) => {
  client.query('SELECT * FROM items', (error, results) => {
    if (error) {
      console.log('ERROR');
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const updateItemQuantity = (request, response) => {
  const id = parseInt(request.params.id);
  const { updatedQuantity } = request.body;

  client.query('UPDATE items SET quantity = $1 WHERE id = $2', [updatedQuantity, id], (error, results) => {
    if (error) {
      console.log('ERROR');
      throw error;
    }
    response.status(200).json({
      status: 'success',
      updatedQuantity,
    });
  });
};

module.exports = {
  getCurrentBalance,
  updateBalance,
  getItems,
  updateItemQuantity,
};

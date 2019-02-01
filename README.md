# online-vending-machine
Online vending machine which requires:
- Ability to add money
- List of items and ability to purchase them
- System is for one user and must save the user's balance

## Getting Started

1. First, clone this repo.
2. Install dependences by running `npm install` inside this repo
3. Next, create a new postgres user by performing the following (note: this is required so login information matches):
  - In terminal, run `psql postgres`
  - You will now be inside psql and will next create the new user. Run `DROP USER IF EXISTS me;`
  - Run `CREATE ROLE me WITH LOGIN PASSWORD 'password';`
  - Run `ALTER ROLE me CREATEDB;`
4. Next, in a new terminal window go to the root of this repo
  - Run `npm run database`
  - Run  `npm start`

The page should open at http://localhost:3000/

##Comments
Used a put request to update balance since this system is only concerned with current balance. If balance history was desired, I would have used post instead.

Made separate components so that they could easily be reused (vending machine items and add balance buttons).

Simple additional improvements if more time permitted:
  - Improve CSS/UI
  - Add functionality for multiple users (would need a users table in database)
  - Add functionality to store transactions in database (would post rather than update database)
  - Add UI to add new items or increase quantity of items


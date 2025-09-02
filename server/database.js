const sqlite3 = require('sqlite3').verbose();
const dbSource = "./database.db"

const db = new sqlite3.Database(dbSource,sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

const customerTableCommand = `CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone_number TEXT NOT NULL UNIQUE
  );`
  db.run(customerTableCommand,[],(err)=>{
    if (err){
        console.log('error creating Table')
        return
    }
    console.log('Customers Table Created')
  })
  


const addressTableCommand = `CREATE TABLE IF NOT EXISTS addresses (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  customer_id INTEGER NOT NULL,
  address_details TEXT NOT NULL,
  city TEXT NOT NULL,
  state  TEXT NOT NULL,
  pin_code TEXT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
  ON DELETE CASCADE);`

    db.run(addressTableCommand,[],(err)=>{
    if (err){
        console.log('error creating Table')
        return
    }
    console.log('Addresses Table Created')
  })


module.exports = db
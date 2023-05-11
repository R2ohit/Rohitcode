const {top_ten_values} = require('./fetch.js');
// in this we are creating data base schema . craeting table and connecting to data base 
const { Client } = require('pg');
const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    database: 'your database',
    password: 'your password',
    port: 5432,
});

const execute = async (query) => {
    try {
        await client.connect();     
        await client.query(query);  
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();        
    }
};

const text = `
    CREATE TABLE IF NOT EXISTS "stock" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
	    "buy" NUMERIC(7,3) NOT NULL,
        "sell" NUMERIC(7,3) NOT NULL,
        "last" NUMERIC(7,3) NOT NULL,
        "base_unit" VARCHAR(100) NOT NULL,
	    PRIMARY KEY ("id")
    );`;

execute(text).then(result => {
    if (result) {
        console.log('Table created');
    }
});

//now to insert data into above craeted table we use those top ten results by looping

const insertstock = async (name,buy,sell,last,base_unit) => {
    try {
        await client.connect();           
        await client.query(
            `INSERT INTO "stock" ("name", "buy","sell","last","base_unit")  
             VALUES ($1, $2,$3,$4,$5)`, [name, buy,sell,last,base_unit]); 
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();               
    }
};

for(let i=0;i<=10;i++){
    insertstock(`${top_ten_values[i][1].name}`,`${top_ten_values[i][1].buy}`,`${top_ten_values[i][1].sell}`,`${top_ten_values[i][1].last}`,`${top_ten_values[i][1].base_unit}`).then(result => {
        if (result) {
            console.log('stock inserted');
        }
    });
}

module.exports  = {client};
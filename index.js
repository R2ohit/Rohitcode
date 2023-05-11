const express = require("express"); 
const path = require('path');
const {client} = require('./postgresql/schema')

const app = express();
const port = 3000;


app.get('/', (req, res)=>{
    client.query(`Select * from stock`, (err, result)=>{
        if(!err){
            res.sendFile(path.join(__dirname, 'index.html'));
             let data = result.rows;
             module.exports = data;
        }
    });
    client.end;
})
client.connect();


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})


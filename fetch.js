let top_ten_values;
fetch('https://api.wazirx.com/api/v2/tickers').then(res=>res.json()).then(data=>{
    
top_ten_values = Object.entries(data);
module.exports = top_ten_values; 
})
// in  this we are fetching data from above url and getting top ten resulst by looping it 
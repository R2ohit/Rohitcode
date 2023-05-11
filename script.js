const data = require('./index');
let placeholder = document.querySelector("#data-output");
   let out = "";
   for(let product of data){
      out += `
         <tr>
            <td>${product.name}</td>
            <td>${product.buy}</td>
            <td>${product.sell}</td>
            <td>${product.last}</td>
            <td>${product.base_unit}</td>
         </tr>
      `;
   }
 
   placeholder.innerHTML = out;
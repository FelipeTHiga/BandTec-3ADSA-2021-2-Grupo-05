import {newsProducts}  from  "./vetor.js";



  var result_number = document.querySelector(".result-number");
  result_number.innerHTML = newsProducts.length;


  function filterBy(category) {
    
    var int count = 0; 
        
        for(i = 0; i < newsProducts.length; i++) {
            
            if(newsProducts[i].category.equals(category)) {
                count++;
            }
        }


   }

















//  document.getElementById("toggle").addEventListener('click', function() {
//      Array.prototype.forEach.call(document.getElementsByClassName('select'), function(elementos) {
//      	elementos.classList[elementos.className.indexOf('active') === -1 ? 'add' : 'remove']('active')
//     }
// )});

    // var elemento = document.getElementById(id);
    // var classes = elemento.className.split(' ');
    // var getIndex = classes.indexOf(classe);

    // if (getIndex === -1) {
    //     classes.push(classe);
    // } else if (getIndex > -1) {
    //     classes.splice(getIndex, 1);
    // }

    // elemento.className = classes.join(' ');
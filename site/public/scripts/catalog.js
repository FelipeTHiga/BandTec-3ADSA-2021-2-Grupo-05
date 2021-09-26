// import {newsProducts}  from  "./vetor.js";



export function searchResult(newsProducts) {
    var result_number = document.querySelector(".result-number");
    result_number.innerHTML = newsProducts.length;

    var countAcessories = 0
    var countFood = 0
    var countCosmeticos = 0
    var countHealth = 0
    var countVestimenta = 0

    for(i = 0; i < newsProducts.length; i++) {
     
        switch (newsProducts.category) {

            case "acessorios":
                countAcessories++;
                break;
            case "alimentos":
                countFood++;
                break;
            case "cosmeticos":
                countCosmeticos++;
                break;
            case "saude":
                countHealth++;
                break;
            case "vestimenta":
                countVestimenta++;
                break;

        }
    }

    var result_acessories = document.querySelector(".result-acessories");
    result_acessories.innerHTML = countAcessories;

    var result_food = document.querySelector(".result-food");
    result_food.innerHTML = countFood;
}



export function filterBy(category) {
    
    var count = 0; 
        
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
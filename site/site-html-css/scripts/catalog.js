import {newsProducts}  from  "./vetor.js";


// export 
function searchResult(newsProducts) {
}

    var result_number = document.querySelector(".result-number");
    result_number.innerHTML = newsProducts.length;

    var countAcessories = 0
    var countFood = 0
    var countCosmetics = 0
    var countHealth = 0
    var countClothing = 0

    for(var i = 0; i < newsProducts.length; i++) {
     
        switch (newsProducts[i].category) {

            case "acessorios":
                countAcessories++;
                break;
            case "alimentos":
                countFood++;
                break;
            case "cosmeticos":
                countCosmetics++;
                break;
            case "saude":
                countHealth++;
                break;
            case "vestimenta":
                countClothing++;
                break;

        }
    }

    var result_number2 = document.querySelector(".result-number-2");
    result_number2.innerHTML = newsProducts.length;

    var result_acessories = document.querySelector(".result-acessories");
    result_acessories.innerHTML = countAcessories;

    var result_food = document.querySelector(".result-food");
    result_food.innerHTML = countFood;

    var result_cosmetics = document.querySelector(".result-cosmetics");
    result_cosmetics.innerHTML = countCosmetics;

    var result_health = document.querySelector(".result-health");
    result_health.innerHTML = countHealth;

    var result_clothing = document.querySelector(".result-clothing");
    result_clothing.innerHTML = countClothing;


// export 

        for(var i = 0; i < newsProducts.length; i++) {
            
            orderedList = newsProducts.stream().sorted(Comparator.comparing(newsProducts[i].category === category));
            console.log(orderedList);
            // if(newsProducts[i].category.equals(category)) {

            // }
        }
//     function filterBy(category) {
//    }


//stream().sorted(Comparator.comparing(Pokemon::getNome)).collect(Collectors.toList());

// window.addEventListener('load', (event) => {
//     //const dropArea = document.querySelectorAll(`.${order}`);
//     document.querySelector(countSearchResult());
// })


// window.addEventListener('load', countSearchResult());

//  document.getElementById("toggle").addEventListener('click', function() {
//      Array.prototype.forEach.call(document.getElementsByClassName('select'), function(elementos) {
//      	elementos.classList[elementos.className.indexOf('active') === -1 ? 'add' : 'remove']('active')
//     }
// )});

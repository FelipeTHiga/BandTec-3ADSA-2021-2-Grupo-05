import  creatElement  from  "./element-html.js";

 const card = new creatElement();


// daqui pra baixo é gambeta, vou refatorar o código e criar um vetor pra testar
 const containerPattern =  document.querySelector(".container-cards-products");

 for (let i = 0; i < 4; i++){
     if (i == 0){
       const arrowLeft = document.createElement("i");
       arrowLeft.classList.add("fas", "fa-caret-left", "arrow");
       containerPattern.appendChild(arrowLeft);
      
     } else if (i == 3) {
        card.card();
        const arrowRight = document.createElement("i");
        arrowRight.classList.add("fas", "fa-caret-right", "arrow");
        containerPattern.appendChild(arrowRight);
        break
     }
     card.card();
 }




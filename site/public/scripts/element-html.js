export  default  class  creatElement {

// essa função tá uma favela, vou refatorar o código pra deixar ela mais clean
    card() {

        const newCard = document.createElement("div");
        newCard.classList.add("card-product", "line-up");
        
        const img = document.createElement("img");
        img.src = "/public/images/shoe.png";
        newCard.appendChild(img);

        const containerEvaluationCard = document.createElement("div");
        newCard.appendChild(containerEvaluationCard);
        containerEvaluationCard.classList.add("container-evaluation-card", "line-up");

        const containerStars = document.createElement("div");
        containerEvaluationCard.appendChild(containerStars);
        containerStars.classList.add("container-stars", "line-up")

        const start1 = document.createElement("img")
        const start2 = document.createElement("img")
        const start3 = document.createElement("img")
        const start4 = document.createElement("img")
        const start5 = document.createElement("img")

        start1.src="/public/images/star.png";
        start2.src="/public/images/star.png";
        start3.src="/public/images/star.png";
        start4.src="/public/images/star.png";
        start5.src="/public/images/half-star.png";

        containerStars.appendChild(start1)
        containerStars.appendChild(start2)
        containerStars.appendChild(start3)
        containerStars.appendChild(start4)
        containerStars.appendChild(start5)


        const containerNote = document.createElement("div");
        const note = document.createElement("p");
        note.innerText = "4.5";
        containerNote.classList.add("container-note", "line-up");

        containerEvaluationCard.appendChild(containerNote);
        containerNote.appendChild(note);
        containerNote.classList.add("container-note", "line-up");


        const containerDescriptionProduct = document.createElement("div");
        newCard.appendChild(containerDescriptionProduct);
        containerDescriptionProduct.classList.add("container-description-product");


        const description = document.createElement("p");
        description.classList.add("description");

        const price = document.createElement("p");
        price.innerText = "R$ 37,50";
        price.classList.add("price");

        const buttonComprar = document.createElement("button");
        const iconCart = document.createElement("i");
        iconCart.classList.add("fas", "fa-shopping-cart");


        containerDescriptionProduct.appendChild(description);
        containerDescriptionProduct.appendChild(price);
        containerDescriptionProduct.appendChild(buttonComprar);
        buttonComprar.appendChild(iconCart);
        buttonComprar.innerText = "Carrinho";

        description.innerText = "Botinas de couro sintético";



       const containerPattern =  document.querySelector(".container-cards-products");
       containerPattern.appendChild(newCard);
        return newCard;
    }

}




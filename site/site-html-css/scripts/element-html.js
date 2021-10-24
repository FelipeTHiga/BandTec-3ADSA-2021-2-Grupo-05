class  creatCardProduct {

    constructor(product, elementContainer){
        this.product = product;
        this.elementContainer = elementContainer;
    }

    card(){
        const newCard = document.createElement("div");
        newCard.classList.add("card-product", "line-up");
        return newCard; 
    }

    imgProduct(){
        const img = document.createElement("img");
        img.src = this.product.imgProduct;
        return img;
    }

    containerEvaluationCard(){
        const containerEvaluationCard = document.createElement("div");
        containerEvaluationCard.classList.add("container-evaluation-card", "line-up");
        return containerEvaluationCard;
    }
    
    containerStars(){
        const containerStars = document.createElement("div");
        containerStars.classList.add("container-stars", "line-up");
        return containerStars;
    }

    star(){
        let vetorStars = [];

        if (this.product.note <= 0.5){

            vetorStars.push("/public/images/half-star.png");

        } else if(this.product.note <= 1) {

            vetorStars.push("/public/images/star.png");

        } else if (this.product.note <= 1.5){
            
            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/half-star.png");

        } else if (this.product.note <= 2){

            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/star.png");

        } else if (this.product.note <= 2.5){

            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/half-star.png");

        } else if (this.product.note <= 3) {

            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/star.png");

        } else if (this.product.note <= 3.5) {

            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/half-star.png");

        } else if (this.product.note <= 4) {

            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/star.png");

        } else if (this.product.note <= 4.5) {

            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/half-star.png");

        } else {

            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/star.png");
            vetorStars.push("/public/images/star.png");

        }

        let imgs = [];
        vetorStars.forEach((srcImg)=>{
            const img = document.createElement("img");
            img.src = srcImg;
            imgs.push(img);
        })
        return imgs;
    }

    containerNote(){
        const containerNote = document.createElement("div");
        containerNote.classList.add("container-note", "line-up");
        const note = document.createElement("p");
        containerNote.appendChild(note);
        note.innerText = this.product.note;
        return containerNote;
    }

    containerDescriptionProduct(){
        const containerDescriptionProduct = document.createElement("div");
        containerDescriptionProduct.classList.add("container-description-product");
        
        containerDescriptionProduct.appendChild(this.description());
        containerDescriptionProduct.appendChild(this.price());
        containerDescriptionProduct.appendChild(this.buttonComprar());

        return containerDescriptionProduct;
    }

    price(){
        const price = document.createElement("p");
        price.innerText = `R$ ${this.product.price}`.replace(".", ",");
        price.classList.add("price");
        return price;
    }

    iconCart(){
        const iconCart = document.createElement("i");
        iconCart.classList.add("fas", "fa-shopping-cart");
        return iconCart;
    }

    buttonComprar(){
        const buttonComprar = document.createElement("button");
        buttonComprar.innerText = "Carrinho";
        buttonComprar.appendChild(this.iconCart());
        return buttonComprar;
    }

    description(){
        const description = document.createElement("p");
        description.classList.add("description");
        description.innerText = this.product.description;
        return description;
    }

    cardProduct() {

       // criando o card 
       const newCard = this.card();
    
       //add img produto ao card
       newCard.appendChild(this.imgProduct());

       //add container da avaliação ao card
       const containerEvaluationCard = this.containerEvaluationCard();
       newCard.appendChild(containerEvaluationCard);
        
       //add container de estrelas ao de avaliação 
        const containerStars = this.containerStars();
        containerEvaluationCard.appendChild(containerStars);
       
        // add estrelas ao container de estrelas
        const star = this.star();
        star.forEach((star)=>{
            containerStars.appendChild(star);
        });
       
        // add container da nota ao container de avaliação
        containerEvaluationCard.appendChild(this.containerNote());
      
        // add container de descrição ao card
        newCard.appendChild(this.containerDescriptionProduct());

        // add card ao container informado como argumento na função
       const containerPattern =  document.querySelector(this.elementContainer);
       containerPattern.appendChild(newCard);
    }
}

class creatCardSeller {
    constructor(cardsSellers){
        this.cardsSellers = cardsSellers;
    }

    card(){
        const containerCardsSellers = document.querySelector(".container-cards-sellers");
        const img = document.createElement("img");
        img.src = this.cardsSellers.img;
        containerCardsSellers.appendChild(img);
    }
}

export {creatCardProduct, creatCardSeller};

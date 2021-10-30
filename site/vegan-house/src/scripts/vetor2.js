import productService from "../services/crud-product";
import loginService from "../services/login";

const selectedProduct = [
    {
        "name": "Calça de algodão marrom",
        "inventory": 1,
        "imgProduct1": "../assets/images/pants-1.png",
        "imgProduct2": "../assets/images/pants-2.png",
        "imgProduct3": "../assets/images/pants-3.png",
        "imgProduct4": "../assets/images/pants-4.png",
        "score": 2,
        "scoreImage": "../assets/images/stars.png",
        "seller": "joaao",
        "price": 90.50,
        "description-text": "A Calça de algodão é a escolha certa para criar looks com muito estilo! Confeccionada em jeans color, a calça apresenta modelagem paper bag, a queridinha do momento! Perfeita para ocasiões especiais, encontros com os amigos e com o crush, aposte! <br /> <br /> Características: <br /> Modelo paper bag <br /> Cós elástico <br /> Cós com passantes <br /> Braguilha com zíper e botões <br /> Bolsos frontais tipo faca <br /> Bolsos posteriores <br /> Barra simples <br /> <br /> <br /> A cor do produto nas fotos reproduzidas com modelos, pode sofrer alteração em decorrência do uso do flash.",
        "category": "vestimenta",
        "instagramAccount": "@joaaoRoupas",
        "facebookAccount": "@joaaoRoupas",
        "WhatsappAccount": "(11)95877-5674",
        "nomeCertification": "Selo da Sociedade Vegetariana Brasileira",
        "imgCertification": "/assets/images/certifications/Selo-2.png",
        "nomeCertification": "Selo da Vegan Societ",
        "imgCertification": "/assets/images/certifications/Selo-3.png",
        "nomeCertification": "Certificado Vegano da Organização Veganismo Brasil",
        "imgCertification": "/assets/images/certifications/Selo-5.png",
    }
];
let user = loginService.getSession();
var list_products = productService.getProducts(user);
console.log(list_products);
// const socialMidias = [
//     {

//     }
// ];

// const certifications = [

// ];

export { selectedProduct, list_products };
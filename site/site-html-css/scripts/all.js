import  {creatCardProduct, creatCardSeller}  from  "./element-html.js";
import  {newsProducts, sellersPop}  from  "./vetor.js";
// import  {searchResult} from "./catalog.js";

   newsProducts.forEach((newProduct) => {
      const card = new creatCardProduct(newProduct, ".container-cards-products");
      card.cardProduct();
   });

   newsProducts.forEach((newProduct)=>{
      const card = new creatCardProduct(newProduct, ".products-highlights");
      card.cardProduct();
   })

   sellersPop.forEach((newSellerPop)=>{
      const cardSeller = new creatCardSeller(newSellerPop);
      cardSeller.card();
   })


   const [vetorProdutos, setVetorProdutos] = React.useState(vetor);

   function criarCard(){
      for (let i = 0; i < vetorProdutos.length; i++){
        let preco = vetorProdutos[0].preco;

      }
   }

  // searchResult(newsProducts);


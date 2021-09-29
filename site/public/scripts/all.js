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

   sellersPop.forEach((sellerPop)=>{
      const cardSeller = new creatCardSeller(sellerPop);
      cardSeller.card();
   })

  // searchResult(newsProducts);


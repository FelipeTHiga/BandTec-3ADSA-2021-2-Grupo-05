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

  // searchResult(newsProducts);


import '../styles/productTableRow.css';
import { user_logged } from "../scripts/crud-user";
import { getProducts, deleteProducts } from "../scripts/crud-product";
let list_products = [{
    id: 0,
    name: "",
    price: 0.0,
    category: "",
    subCategory: "",
    description: "",
    invetory: 0,
    fkUser: 0
}];

export function ProductTableRow(props) {
  list_products = getProducts(); 
  for (var i = 0; i < list_products.length; i++){
    return (
      <>
        <div className="products-table-row">
            <label>{list_products[i].name}</label>
            <label>{list_products[i].category}</label>
            <label>{list_products[i].subCategory}</label>
            <label>{list_products[i].invetory}</label>

            <div className="products-table-row-buttons">
                <button><i class="fas fa-edit"></i></button>
                <button><i class="fas fa-trash"></i></button>
            </div>
        </div>
      </>
    );
  }
}
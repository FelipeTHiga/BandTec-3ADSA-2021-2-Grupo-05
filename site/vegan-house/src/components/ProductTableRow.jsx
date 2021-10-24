import '../styles/productTableRow.css';
import { user_logged } from "../scripts/crud-user";
import { getProducts, deleteProducts, list_products } from "../scripts/crud-product";
import api from '../scripts/api';
import React, { Component, useState } from "react";

class Products extends Component {
  state = {
    products: [{
      id: 0,
      name: "",
      category: "",
      subCategory: "",
      inventory: ""
    }],
    error: ""
  };



  handleProducts = async e => {
    try {
      const response = await api.get("/product/all");
      // this.props.history.push("/home");
      if (response.status != 200) {
        this.setState({
          error:
            "Você não possui produtos cadastrados."
        });
      }
      this.setState({ products: response.data });
    } catch (err) {
      this.setState({
        error:
          "Ocorreu um erro ao buscar produtos."
      });
    }
    return this.state.products;
  }

  render() {
    return (
      <>
        {
          list_products.map(product => (
            <div className="products-table-row" key={product.id}>
              <label>{product.name}</label>
              <label>{product.category}</label>
              <label>{product.subCategory}</label>
              <label>{product.inventory}</label>

              <div className="products-table-row-buttons">
                <button><i class="fas fa-edit"></i></button>
                <button><i class="fas fa-trash"></i></button>
              </div>
            </div>
          ))
        }
      </>
    )
  }
}

export function ProductTableRow(params) {
  return (
    new Products()
  )
}

// export function ProductTableRow({id, name, category, subCategory, inventory}) {
//   return (
//     <>
//       <div className="products-table-row" key={id}>
//         <label>{name}</label>
//         <label>{category}</label>
//         <label>{subCategory}</label>
//         <label>{inventory}</label>

//         <div className="products-table-row-buttons">
//           <button><i class="fas fa-edit"></i></button>
//           <button><i class="fas fa-trash"></i></button>
//         </div>
//       </div>
//     </>
//   )
// }



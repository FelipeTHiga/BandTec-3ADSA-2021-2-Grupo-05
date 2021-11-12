import '../styles/productTableRow.css';
import React, { Component, useState } from "react";
import loginService from '../services/login';
import productService from '../services/crud-product'

let user = loginService.getSession();
class Products extends Component {
  state = {
    products: [{
      id: 0,
      name: "",
      category: "",
      subCategory: "",
      inventory: ""
    }],
    error: "",
    testeList: []
  };

  getProd (){
    let user = loginService.getSession();
      productService.getProducts(user).then ( list => {
      console.log(list)
      this.setState({testeList : list.data})
    })
  }

  componentDidMount() {
    this.getProd()
  }
  
  render() {
    return (
      <>
        {
          this.state.testeList.map(product => (
            <div className="products-table-row" key={product.id}>
              <label>{product.name}</label>
              <label>{product.category}</label>
              <label>{product.subCategory}</label>
              <label>{product.inventory}</label>

              <div className="products-table-row-buttons">
                <button ><i class="fas fa-edit"></i></button>
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



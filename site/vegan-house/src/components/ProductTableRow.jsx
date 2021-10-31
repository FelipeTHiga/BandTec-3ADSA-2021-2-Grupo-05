import '../styles/productTableRow.css';
import api from '../services/api';
import React, { Component, useState } from "react";
import { list_products } from '../scripts/vetor2';

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

  // handleProducts = async e => {
  //   try {
  //     const response = await api.get("/product/all");
  //     // this.props.history.push("/home");
  //     if (response.status != 200) {
  //       this.setState({
  //         error:
  //           "Você não possui produtos cadastrados."
  //       });
  //     }
  //     this.setState({ products: response.data });
  //   } catch (err) {
  //     this.setState({
  //       error:
  //         "Ocorreu um erro ao buscar produtos."
  //     });
  //   }
  //   return this.state.products;
  // }

  getProd (){
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



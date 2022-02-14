import api from "./api";
import loginService from '../services/login'

const productService = {
    state: {
        products: null
    },

    // Request para o endpoint de cadastro de produto
    async createProduct() {
        let user = loginService.getSession();
        if (user){
            const product = {
                name: document.getElementById("name_product").value,
                price: parseFloat(document.getElementById("price").value),
                category: document.getElementById("category").value,
                description: document.getElementById("description").value,
                inventory: parseInt(document.getElementById("inventory").value),
                fkUser: user.id
            }
    
            return api.post("/products", product);
        }
    },

    // Request para o endpoint para recuperar um produto (id)
    async getProductById(productId) {
        return await api({
            method: 'get',
            url: `/products/${productId}`,
        })
    },

    // getProductByCategory(category){
    //     //const category = document.getElementById("name_search").value;
    
    //     return await api({
    //         method: 'get',
    //         url: `/product/tag/${category}`
    //     }).then(function (response) {
    //         const status = response.status;
    //         console.log(status);
    //         list_products = response.data;
    //     });
    // },

    // async getProductByIdAndSeller(productId) {
    //     return await api({
    //         method: 'get',
    //         url: `/products/${productId}/productSeller`,
    //     })
    // },

    // Request para recuperar todos os produtos de uma loja
    async getProducts(user) {
        if(user){
            return await api({
                method: "get",
                url: '/products/all',
                params: user.id
            })
        }
    },

    async getProductsAll() {
        return await api({
            method: "get",
            url: '/products/all'
        })
    },


    // Request para atualizar o produto 
    async updateProduct(productData) {
        return await api({
            method: 'put',
            url: '/products',
            params: productData.id
        })
    },

    // Request para deletar um produto
    async deleteProduct(productData) {
        return await api({
            method: 'delete',
            url: '/products',
            params: productData.id
        })
    },

    setProducts(products) {
        this.state.products = products;
        console.log(this.state.products);
    },

    products() {
        if (this.state.products) {
            return this.state.products;
        }
        console.log("Sem produtos!")
        return null;
    }
}

export default productService;


// import api from "./api";
// import { getUser, user_logged} from '../services/crud-user';
// import { Redirect, Route, Router, __RouterContext } from "react-router";

// var list_products = [{
//         id: "",
//         name: "",
//         price: 0.0,
//         category: "",
//         subCategory: "",
//         description: "",
//         inventory: 0,
//         fkUser: 1
// }];
// getUser();



// async function getProductByName(){
//     const name = document.getElementById("name_search").value;

//     await api({
//         method: 'get',
//         url: '/products',
//         params: {
//             name: name,
//             id: user_logged.id
//         },
//     })
//     .then(function (response) {
//         const status = response.status;
//         console.log(status);
//         list_products = response.data;
//     });
// }



// async function getProducts(props){
//     await api({
//         method: 'get',
//         url: '/product/all',
//         params: user_logged.id
//     })
//     .then(function (response) {
//         console.log(response.data);
//         list_products = response.data;
//         return response.data;
//     });
// }


// async function deleteProducts(props){
//     await api({
//         method: 'delete',
//         url: '/product',
//         params: props.id
//     })
//     .then(function (response) {
//         const status = response.status;
//         console.log(status);
//     });
// }

// async getProductByCategory(){
//     const category = document.getElementById("name_search").value;

//     await api({
//         method: 'get',
//         url: `/product/tag/${category}`,
//         params: {
//             category: category,
//             id: user_logged.id
//         }

//     })
//     .then(function (response) {
//         const status = response.status;
//         console.log(status);
//         list_products = response.data;
//     });
// }



// export {createProduct, getProductByName, getProductByCategory, getProducts, deleteProducts, list_products};
import { getUser, user_logged} from '../services/crud-user';
import { __RouterContext } from "react-router";
import api from "../services/api";

var list_products = [{
        id: "",
        name: "",
        price: 0.0,
        category: "",
        description: "",
        inventory: 0,
        fkUser: 1
}];
getUser();

async function createProduct(){

    const product = {
        name: document.getElementById("name_product").value,
        price: parseFloat(document.getElementById("price").value),
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        inventory: parseInt(document.getElementById("inventory").value),
        fkUser: user_logged.id
    }

    await api({
        method: 'post',
        url: '/product',
        data: product,
    })
    .then(function (response) {
        const status = response.status;
    });
}

async function getProductByName(){
    const name = document.getElementById("name_search").value;

    await api({
        method: 'get',
        url: '/product',
        params: {
            name: name,
            id: user_logged.id
        },
    })
    .then(function (response) {
        const status = response.status;
        list_products = response.data;
    });
}

async function getProductByCategory(){
    const category = document.getElementById("name_search").value;

    await api({
        method: 'get',
        url: '/product/tag',
        params: {
            category: category,
            id: user_logged.id
        }
        
    })
    .then(function (response) {
        const status = response.status;
        list_products = response.data;
    });
}

async function  getProducts() {
   await api({
        method: 'get',
        url: '/products/all',
        params: user_logged.id
    }).then((response)=> {
       let produto =  response.data;
        return produto;
    })
    .then(function (response) {
        list_products = response.data;
        return response.data;
    });
}

async function deleteProducts(props){
    await api({
        method: 'delete',
        url: '/product',
        params: props.id
    })
    .then(function (response) {
        const status = response.status;
    });
}

export {createProduct, getProductByName, getProductByCategory, getProducts, deleteProducts, list_products};
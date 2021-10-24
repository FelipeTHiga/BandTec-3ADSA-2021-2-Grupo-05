import api from "./api";
import { getUser, user_logged} from '../scripts/crud-user';
import { Redirect, Route, Router, __RouterContext } from "react-router";

var list_products = [{
        id: "",
        name: "",
        price: 0.0,
        category: "",
        subCategory: "",
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
        subCategory: document.getElementById("sub_category").value,
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
        console.log(status);
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
        console.log(status);
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
        console.log(status);
        list_products = response.data;
    });
}

async function getProducts(props){
    await api({
        method: 'get',
        url: '/product/all',
        params: user_logged.id
    })
    .then(function (response) {
        console.log(response.data);
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
        console.log(status);
    });
}



export {createProduct, getProductByName, getProductByCategory, getProducts, deleteProducts, list_products};
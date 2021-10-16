import api from "./api";
import { getUser, user_logged} from '../scripts/crud-user';


async function createProduct(){

    const product = {
        name: document.getElementById("name_product").value,
        price: parseFloat(document.getElementById("price").value),
        category: document.getElementById("category").value,
        subCategory: document.getElementById("sub_category").value,
        description: document.getElementById("description").value,
        invetory: parseInt(document.getElementById("inventory").value),
        fkUser: 1
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
        params: name,
    })
    .then(function (response) {
        const status = response.status;
        console.log(status);
    });
}

async function getProductByCategory(){
    const category = "";

    await api({
        method: 'get',
        url: '/product/tag',
        params: category,
    })
    .then(function (response) {
        const status = response.status;
        console.log(status);
    });
}

async function getProducts(props){
    var list = [{}];
    await api({
        method: 'get',
        url: '/product/all'
    })
    .then(function (response) {
        console.log(response.data);
        list = response.data;
    });
    return list;
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



export {createProduct, getProductByName, getProductByCategory, getProducts, deleteProducts};
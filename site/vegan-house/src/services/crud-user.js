import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router";
import api from "./api";
import loginService from '../services/login'

var user_logged = {
    id: 0,
    nameUser: "",
    surName: "",
    cpf: "",
    email: ""
};

async function submit(props) {
    const user = {
        nameUser: document.getElementById("name").value,
        surName: document.getElementById("surname").value,
        cpf: document.getElementById("cpf").value,
        email: document.getElementById("email").value,
        passwordUser: document.getElementById("password").value
    }
    
    await api({
        method: 'post',
        url: '/users',
        data: user,
    })
    .then(function (response) {
        console.log(response.status);
    });
}

async function subscribe(fkProduct, fkUser) {
    console.log(fkProduct)
    console.log(fkUser)

    await api({
        method: 'post',
        url: '/restock-subscribe',
        data: {
            fkProduct: fkProduct,
            fkUser: fkUser
        }
    })
}

async function getAdress() {
    let userLogged = loginService.getSession();
    await api({
        method: 'get',
        url: `/adress/${userLogged.id}`,
    })
}

async function submitAdress(props) {
    let userLogged = loginService.getSession();
    const userAdress = {
        street: document.getElementById("street").value,
        number: document.getElementById("numberHouse").value,
        state: document.getElementById("state").value,
        city: document.getElementById("city").value,
        complement: document.getElementById("complement").value,
        cep: document.getElementById("cep").value,
        district: document.getElementById("district").value,
        fkUser: userLogged.id
    }
    
    await api({
        method: 'post',
        url: '/users/adress',
        data: userAdress,
    })
    .then(function (response) {
        console.log(response.status);
    });

}


async function login(){
    const user = {
        email: document.getElementById("email_login").value,
        passwordUser: document.getElementById("password_login").value
    }
    var status;
    await api({
        method: 'post',
        url: '/session/login',
        data: user,
    })
    .then(function (response) {
        status = response.status;
    });

    console.log(status);
}

async function getUser(){

    await api({
        method: 'get',
        url: '/session',
    })
    .then(function (response) {
        if (response.status === 200){
            user_logged = response.data;
            return response.data;

        }
        console.log(response.status)
    });
    
}

async function getUserById(userId) {
    return await api({
        method: 'get',
        url: `/users/${(userId)}`,
    })
}


async function updateUser(props) {
    let userUpdate = loginService.getSession();
    const user = {
        id: userUpdate.id,
        nameUser: userUpdate.nameUser,
        surName: userUpdate.surName,
        cpf: userUpdate.cpf,
        email: document.getElementById("emailUserUpdate").value,
        passwordUser: userUpdate.passwordUser
    }

    await api({
        method: 'put',
        url: '/users',
        params: {
            idUser: userUpdate.id
        },
        data: user,
    })
    .then(function (response) {
        console.log(response.status);
    });
}

export {submit, getUser, login, user_logged, updateUser, submitAdress, getAdress, subscribe, getUserById};


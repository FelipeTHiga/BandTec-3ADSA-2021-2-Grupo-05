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
        cpf: document.getElementById("cpf").value.replace(/\D/g,''),
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

async function getAdress() {
    let userLogged = loginService.getSession();
    await api({
        method: 'get',
        url: `/adress/${userLogged.id}`,
    })
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



export {submit, getUser, login, user_logged, getAdress};
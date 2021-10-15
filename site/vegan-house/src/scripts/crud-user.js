import { Link } from "react-router-dom";
import api from "./api";

function submit() {
    debugger
    const user = {
        nameUser: document.getElementById("name").value,
        surName: document.getElementById("surname").value,
        cpf: document.getElementById("cpf").value,
        email: document.getElementById("email").value,
        passwordUser: document.getElementById("password").value
    }

    console.log(user);

    api({
        method: 'post',
        url: '/user',
        data: user,
    }).then(function (response) {
        console.log(response.data)
    });
}

function login(){
    const user = {
        email: document.getElementById("email_login").value,
        passwordUser: document.getElementById("password_login").value
    }

    console.log(user);

    api({
        method: 'post',
        url: '/session/login',
        data: user,
    }).finally(function (response) {
        console.log(response.status)
        if(response.status === 200){
            return <Link to="/home"/>
        }
    });
    debugger
}

function getUser(){
    
    api({
        method: 'get',
        url: '/session',
    }).then(function (response) {
        debugger
        console.log(response.data)
        if (response.status !== 200){
            return false;
        }
        return true;
    });
}

export {submit, getUser, login};
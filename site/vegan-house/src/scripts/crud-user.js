import api from "./api";

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
        url: '/user',
        data: user,
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

    await api({
        method: 'post',
        url: '/session/login',
        data: user,
    })
    .then(function (response) {
        const status = response.status;
        console.log(status);
    });

}

async function getUser(){
    var user_logged = {
        id: "",
        nameUser: "",
        surName: "",
        cpf: "",
        email: "",
        isSeller: false
    }
    var statusRes;

    await api({
        method: 'get',
        url: '/session',
    })
    .then(function (response) {
        statusRes = response.status;
        user_logged = response.data;
    });

    if (statusRes === 200){
        return user_logged;
    }

    console.log(user_logged);
    return null;
}


export {submit, getUser, login};
import api from "./api";

const loginService = {

    // Faz o POST na API chamando o endpoint de login
    async login (dados) {
        return api.post("session/login", dados)
    },

    // Salva os dados o user (JSON) na sessionStorage 
    setSession (dados) {
        let parseDados = JSON.stringify(dados)
        sessionStorage.setItem("user", parseDados)
    },

    // Recupera o user que está salvo na sessionStorage, caso ele esteja salvo
    getSession () {
        let dado = sessionStorage.getItem("user");

        if (!dado) {
            return null
        }

        try {
            let parsedDado = JSON.parse(dado)
            return parsedDado
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

export default loginService;
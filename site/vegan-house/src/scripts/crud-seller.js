import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router";
import api from "./api";



const serviceSeller = {
    async submitSeller(props) {
        const user = {
            commercialName: document.getElementById("name").value,
            cnpj: document.getElementById("cnpj").value.replace(/\D/g,''),
            commercialEmail: document.getElementById("email").value,
        }
        await api({
            method: 'post',
            url: '/sellers',
            data: user,
        })
        .then(function (response) {
            sessionStorage.setItem("user", response.data)
            console.log(response)
            console.log(response.data)
            console.log(response.config)
            console.log(response.status);
            console.log(response.request);
            console.log(response.statusText);
        })
    }
}


export default serviceSeller;
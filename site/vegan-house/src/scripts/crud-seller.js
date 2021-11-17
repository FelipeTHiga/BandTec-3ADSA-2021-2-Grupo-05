import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router";
import api from "./api";




const serviceSeller = {
    async submitSeller(props) {
        const user = {
            commercialName: document.getElementById("name").value,
            cnpj: document.getElementById("cnpj").value,
            commercialEmail: document.getElementById("email").value,
        }
        await api({
            method: 'post',
            url: '/seller',
            data: user,
        })
        .then(function (response) {
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
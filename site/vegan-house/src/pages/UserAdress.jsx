import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AccountMenu } from '../components/AccountMenu';
import { SellerMenu } from '../components/SellerMenu';
import { SectionTitle } from '../components/SectionTitle';
import { UserGreeting } from '../components/UserGreeting';
import { submitAdress } from '../scripts/crud-user';
import { useState, useEffect } from 'react';

import loginService from '../services/login';
import api from '../scripts/api';
import axios from 'axios';
import InputMask from 'react-input-mask';


import '../styles/global.scss';
import '../styles/reset.scss';
import '../styles/userAdress.scss';

export function UserAdress() {

    let userUpdate = loginService.getSession();

    const [cep, setCep] = useState('')
    const [street, setStreet] = useState('')
    const [district, setDistrict] = useState('')
    const [number, setNumber] = useState('')
    const [complement, setComplement] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [adress, setAdress] = useState({})
    const [idAdress, setIdAdress] = useState(0)
    const [error, setError] = useState("");
    const [errorCep, setErrorCep] = useState("");
    const [errorStreet, setErrorStreet] = useState("");
    const [errorDistrict, setErrorDistrict] = useState("");
    const [errorNumber, setErrorNumber] = useState("");
    const [errorState, setErrorState] = useState("");
    const [errorCity, setErrorCity] = useState("");
    const [errorComplement, setErrorComplement] = useState("");
    
    function warmings(errors) {

        if (errors.cep) {
            setErrorCep(errors.cep)
        }
       
        if (errors.street) {
            setErrorStreet(errors.street)
        }
        if (errors.district) {
            setErrorDistrict(errors.district)
        }
        if (errors.city) {
            setErrorCity(errors.city)
        }
        if (errors.state) {
            setErrorState(errors.state)
        }
        if (errors.number) {
            setErrorNumber(errors.number)
        }
      

    }

 function submitAdress(e) {
        e.preventDefault();

        setErrorCep("");
        setErrorStreet("");
        setErrorDistrict("");
        setErrorNumber("");
        setErrorCity("");

        const userAdress = {
            street: street,
            number: number,
            state: state,
            city: city,
            complement: complement,
            cep: cep.replace(/\D/g,''),
            district: district,
            fkUser: userUpdate.id
        }
        
     api({
            method: 'post',
            url: '/users/adress',
            data: userAdress,
        })
        .then(function (response) {
            console.log(response.status);
            alert('Endereço cadastrado com sucesso')
            window.location.reload();
        }).catch((err) => {
            warmings(err.response.data);

        });
    }

    function updateAdress(e) {
        e.preventDefault();

        setErrorCep("");
        setErrorStreet("");
        setErrorDistrict("");
        setErrorNumber("");
        setErrorCity("");
        const adress = {
            idAdress: idAdress,
            cep: cep.replace(/\D/g,''),
            street: street,
            district: district,
            city: city,
            state: state,
            complement: complement,
            number: number,
            fkUser: userUpdate.id
        }

        api({
            method: 'put',
            url: `/users/adress/${idAdress}`,
            data: adress,
        })
            .then(function (response) {
                console.log(response.status);
                alert('Endereço atualizado com sucesso')
                window.location.reload();

            }).catch((err) => {
                warmings(err.response.data);

                });
    }



    useEffect(() => {
        let user = loginService.getSession();

        async function payload() {

            const res = await api.get(`users/adress/${user.id}`);
            setAdress(res.data);

            if (res.status === 200) {
                setCep(res.data.cep);
                setStreet(res.data.street);
                setCity(res.data.city);
                setState(res.data.state);
                setDistrict(res.data.district);
                setNumber(res.data.number);
                setComplement(res.data.complement);
                setIdAdress(res.data.idAdress);
                document.getElementById('btn-sign').style.display = 'none';
                document.getElementById('btn-put').style.display = 'block';

            }
        }

        payload();
    }, {})


    function pullCep() {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res) => {

            setStreet(res.data.logradouro)
            setCity(res.data.localidade)
            setState(res.data.uf)
            setDistrict(res.data.bairro)
            setNumber('')
            setComplement('')
        })
    }

    return (
        <>
            <Navbar />
            <div className="page-container">
                <UserGreeting username={userUpdate.nameUser} isSeller={userUpdate.isSeller} />
            </div>

            <div className="line-up">
                <Title title="Seu perfil" />
            </div>
            <div className="page-container">
                <div className="container-menu-and-adress">
                    <div className="section-menus align-column">
                        <AccountMenu isSeller={userUpdate.isSeller} />
                        <SellerMenu isSeller={userUpdate.isSeller} />
                    </div>

                    <div className="section-adress">
                        <div className="container-adress">
                            <SectionTitle text="Endereço" />
                            <div className="container-adress-data">
                                <form>
                                    <div className="container-input">
                                        <label for="cep">CEP</label>
                                        <div>
                                            <InputMask mask="99999-999" maxLength="10" onBlur={pullCep} onChange={e => { setCep(e.target.value) }} value={cep} className="input-default input-address" type="text" placeholder="" name="" id="cep" />
                                        </div>
                                        {errorCep && <p className="error">{errorCep}</p>}
                                    </div>
                                    <div className="container-city">
                                        <div className="container-state">
                                            <label for="state">Estado</label>
                                            <select onChange={e => { setState(e.target.value.replace(/\D/g,'')) }} value={state} id="state">
                                                <option value="">-- Selecione --</option>
                                                <option value="AC">Acre</option>
                                                <option value="AL">Alagoas</option>
                                                <option value="AP">Amapá</option>
                                                <option value="AM">Amazonas</option>
                                                <option value="BA">Bahia</option>
                                                <option value="CE">Ceará</option>
                                                <option value="DF">Distrito Federal</option>
                                                <option value="ES">Espírito Santo</option>
                                                <option value="GO">Goiás</option>
                                                <option value="MA">Maranhão</option>
                                                <option value="MT">Mato Grosso</option>
                                                <option value="MS">Mato Grosso do Sul</option>
                                                <option value="MG">Minas Gerais</option>
                                                <option value="PA">Pará</option>
                                                <option value="PB">Paraíba</option>
                                                <option value="PR">Paraná</option>
                                                <option value="PE">Pernambuco</option>
                                                <option value="PI">Piauí</option>
                                                <option value="RJ">Rio de Janeiro</option>
                                                <option value="RN">Rio Grande do Norte</option>
                                                <option value="RS">Rio Grande do Sul</option>
                                                <option value="RO">Rondônia</option>
                                                <option value="RR">Roraima</option>
                                                <option value="SC">Santa Catarina</option>
                                                <option value="SP">São Paulo</option>
                                                <option value="SE">Sergipe</option>
                                                <option value="TO">Tocantins</option>
                                            </select>
                                            {errorState && <p className="error">{errorState}</p>}
                                        </div>

                                        <div className="container-city-2">
                                            <label for="city">Cidade</label>
                                            <input onChange={e => { setCity(e.target.value.replace(/[^a-zA-Z áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g, "")) }} value={city} className="input-city" type="text" placeholder="" name="" id="city" />
                                            {errorCity && <p className="error">{errorCity}</p>}
                                        </div>
                                    </div>
                                    <div className="container-input">
                                        <label for="district">Bairro</label>
                                        <div>
                                            <input onChange={e => { setDistrict(e.target.value.replace(/[^a-zA-Z áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g, "")) }} value={district} className="input-default input-address" type="text" placeholder="" name="" id="district" />
                                        </div>
                                        {errorDistrict && <p className="error">{errorDistrict}</p>}
                                    </div>
                                    <div className="container-input">
                                        <label for="street">Rua</label>
                                        <div>
                                            <input onChange={e => { setStreet(e.target.value.replace(/[^a-zA-Z áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g, "")) }} value={street} className="input-default input-address" type="text" placeholder="" name="" id="street" />
                                        </div>
                                        {errorStreet && <p className="error">{errorStreet}</p>}
                                    </div>
                                    <div className="container-input">
                                        <label for="numberHouse">Número</label>
                                        <div>
                                            <input onChange={e => { setNumber(e.target.value.replace(/[^a-zA-Z0-9 áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g, "")) }} value={number} className="input-default input-address" type="text" placeholder="" name="" id="numberHouse" />
                                        </div>
                                        {errorNumber && <p className="error">{errorNumber}</p>}
                                    </div>
                                    <div className="container-input">
                                        <label for="complement">Complemento</label>
                                        <div>
                                            <input onChange={e => { setComplement(e.target.value.replace(/[^a-zA-Z0-9 áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g, "")) }} value={complement} className="input-default input-address" type="text" placeholder="" name="" id="complement" />
                                        </div>
                                        {errorComplement && <p className="error">{errorComplement}</p>}
                                    </div>

                                    <div className="button-form-adress">
                                        <button id="btn-sign" onClick={submitAdress}>Cadastrar</button>
                                        <button id="btn-put" onClick={updateAdress}>Atualizar</button>
                                    </div>
                                        {error.length > 0 ? error.map(erro => <p className="error">{erro}</p>) : <div />}
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AccountMenu } from '../components/AccountMenu';
import { SellerMenu } from '../components/SellerMenu';
import { SectionTitle } from '../components/SectionTitle';
import { UserGreeting } from '../components/UserGreeting';
import { submitAdress, user_logged, login, getAdress } from '../scripts/crud-user';
import loginService from '../services/login'
import api from '../scripts/api'
import '../styles/global.scss';
import '../styles/reset.css';
import '../styles/userAdress.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask'

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

    function updateAdress(e) {
        e.preventDefault();
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
                alert("Dados atualizados com sucesso")
            });
    }



    useEffect(() => {
        let user = loginService.getSession();
        async function pegaDados() {
            const res = await api.get(`users/adress/${user.id}`);
            setAdress(res.data);
            console.log(res.data);

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

        pegaDados();
    }, {})



    function pullCep() {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res) => {

            setStreet(res.data.logradouro)
            setCity(res.data.localidade)
            setState(res.data.uf)
            setDistrict(res.data.bairro)
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
                                            <InputMask mask="99999-999" onBlur={pullCep} onChange={e => { setCep(e.target.value) }} value={cep} className="input-default input-address" type="text" placeholder="" name="" id="cep" />
                                        </div>
                                    </div>
                                    <div className="container-city">
                                        <div className="container-state">
                                            <label for="state">Estado</label>
                                            <select onChange={e => { setState(e.target.value) }} value={state} id="state">
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
                                        </div>

                                        <div className="container-city-2">
                                            <label for="city">Cidade</label>
                                            <input onChange={e => { setCity(e.target.value) }} value={city} className="input-city" type="text" placeholder="" name="" id="city" />
                                        </div>
                                    </div>
                                    <div className="container-input">
                                        <label for="district">Bairro</label>
                                        <div>
                                            <input onChange={e => { setDistrict(e.target.value) }} value={district} className="input-default input-address" type="text" placeholder="" name="" id="district" />
                                        </div>
                                    </div>
                                    <div className="container-input">
                                        <label for="street">Rua</label>
                                        <div>
                                            <input onChange={e => { setStreet(e.target.value) }} value={street} className="input-default input-address" type="text" placeholder="" name="" id="street" />
                                        </div>
                                    </div>
                                    <div className="container-input">
                                        <label for="numberHouse">Número</label>
                                        <div>
                                            <input onChange={e => { setNumber(e.target.value) }} value={number} className="input-default input-address" type="text" placeholder="" name="" id="numberHouse" />
                                        </div>
                                    </div>
                                    <div className="container-input">
                                        <label for="complement">Complemento</label>
                                        <div>
                                            <input onChange={e => { setComplement(e.target.value) }} value={complement} className="input-default input-address" type="text" placeholder="" name="" id="complement" />
                                        </div>
                                    </div>

                                    <div className="button-form-adress">
                                        <button id="btn-sign" onClick={submitAdress}>Cadastrar</button>
                                        <button id="btn-put" onClick={updateAdress}>Atualizar</button>
                                    </div>
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
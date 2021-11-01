import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AccountMenu } from '../components/AccountMenu';
import { SellerMenu } from '../components/SellerMenu';
import { SectionTitle } from '../components/SectionTitle';
import { UserGreeting } from '../components/UserGreeting';
import { user_logged } from '../scripts/crud-user';
import { Button } from '../components/Button';
import '../styles/global.scss';
import '../styles/reset.css';
import '../styles/userAdress.scss';
import { useState } from 'react';
import axios from 'axios';

export function UserAdress() {
    
    
const [cep, setCep] = useState('')
const [street, setStreet] = useState('')
const [district, setDistrict] = useState('')
const [number, setNumber] = useState('')
const [complement, setComplement] = useState('')
const [city, setCity] = useState('')
const [state, setState] = useState('') 

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
        <Navbar isLogged={true} />
        <div className="page-container">
            <UserGreeting username={user_logged.nameUser} isSeller={false} />
        </div>

        <div className="line-up">
            <Title title="Seu perfil" />
        </div>
        <div className="page-container">
            <div className="container-menu-and-adress">
                <div className="section-menus align-column">
                    <AccountMenu isSeller={false} />
                    <SellerMenu isSeller={false} />
                </div>

                <div className="section-adress">
                    <div className="container-adress">
                        <SectionTitle text="Dados pessoais" />
                        <div className="container-adress-data">
                            <form action="" method="PUT">
                                <div className="container-input">
                                    <label for="cep">CEP</label>
                                    <div>
                                        <input onBlur={pullCep} onChange={e => { setCep(e.target.value) }} value={cep} className="input-default input-address" type="text" placeholder="" name="" id="cep" />
                                    </div>
                                </div>
                                <div className="container-city">
                                    <div className="container-state">
                                        <label for="state">Estado</label>
                                        <select onChange={e => { setState(e.target.value) }} value={state}>
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
                                        <input onChange={e => { setStreet(e.target.value) }} value={street} className="input-default input-address" type="text" placeholder="" name="" id="road" />
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
                                <button>Atualizar</button>
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
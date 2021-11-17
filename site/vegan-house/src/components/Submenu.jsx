import '../styles/submenu.scss';
import { useHistory } from 'react-router';
import React, { useState } from 'react';

export function Submenu(props) {

    const history = useHistory();
    const [categoryT, setCategoryT] = useState("");   
    
    const redirectTo = (event) => {

        setCategoryT(event.target.id)
        history.push(`/todos-os-resultados/${categoryT}`);
    }

    // function redirectTo = (event) => {
    //     setCategoryT(event.target.id)
    //     history.push(`/todos-os-resultados/${categoryT}`);
    // }

    return (
        <section className="sub-menu line-up">
            <ul className="line-up">
                <li className="foods ">
                    <i className=" fas fa-utensils"></i>
                    <div id={"Alimentos"} className="a-category" onClick={redirectTo} >Alimentos</div>
                </li>
                <li className="cosmetics ">
                    <i className="fas fa-air-freshener"></i>
                    <div id={"Cosmeticos"} className="a-category" onClick={redirectTo}>Cosméticos</div>
                </li>
                <li className="health ">
                    <i className="fas fa-first-aid"></i>
                    <div id={"Saude"} className="a-category" onClick={redirectTo}>Saúde</div>                 
                </li>
                <li className="accessories ">
                    <i className="fas fa-suitcase"></i>
                    <div id={"Acessorios"} className="a-category" onClick={redirectTo}>Acessórios</div>                   
                </li>
                <li className="dress ">
                    <i className="fas fa-tshirt"></i>
                    <div id={"Vestimenta"} className="a-category" onClick={redirectTo}>Vestimentas</div>
                </li>
            </ul>
        </section>
    )
}
import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AccountMenu } from '../components/AccountMenu';
import { SellerMenu } from '../components/SellerMenu';
import { SectionTitle } from '../components/SectionTitle';
import { UserGreeting } from '../components/UserGreeting';
import { useParams, useHistory } from "react-router";
import React, { Component, useEffect, useState } from 'react';
import { OrderBox } from '../components/OrderBox';

import loginService from '../services/login'
import api from "../services/api";

import '../styles/myOrders.scss';


export function MyOrders() {
    let userUpdate = loginService.getSession();

    const history = useHistory();
    const [orders, setOrder] = React.useState([]);
    const [defaultMessage, setDefaultMessage] = useState("");
    let userLogged = loginService.getSession();

    useEffect(() => {
        if (userLogged) {
            function getOrder() {
                api.get(`orders/user/${userLogged.id}`)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log(res.data);
                            setOrder(res.data);
                            setDefaultMessage("");
                        } else if (res.status === 204) {
                            setDefaultMessage("Você ainda não fez nenhum pedido.");
                        }

                    }).catch((err) => {
                        console.log(err);
                    })
            }

            getOrder();
        }
        else {
            history.push(`/login`);
        }
    }, [])

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
                <div className="container-menu-and-orders">
                    <div className="section-menus align-column">
                        <AccountMenu isSeller={userUpdate.isSeller} />
                        <SellerMenu isSeller={userUpdate.isSeller} />
                    </div>

                    <div className="section-orders">
                        <div className="container-orders">
                            <SectionTitle text="Pedidos" />
                            {orders.map(order => <OrderBox orderId={order.idOrder} date={order.orderDate} total={order.total} status={order.orderStatus} orderItems={order.orderItems} />)}
                            <div className='defaultMessage card-orders-sales'>{defaultMessage}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
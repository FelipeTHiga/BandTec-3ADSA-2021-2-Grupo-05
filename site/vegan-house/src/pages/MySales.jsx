import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AccountMenu } from '../components/AccountMenu';
import { SellerMenu } from '../components/SellerMenu';
import { SectionTitle } from '../components/SectionTitle';
import { UserGreeting } from '../components/UserGreeting';
import loginService from '../services/login'
import { SaleBox } from '../components/SaleBox'
import '../styles/mySales.scss';
import '../styles/myOrders.scss';
import api from '../services/api';
import { useHistory } from 'react-router';
import React, { useEffect } from 'react'

export function MySales() {
    let userUpdate = loginService.getSession();

    const history = useHistory();
    const [sales, setSales] = React.useState([]);

    useEffect(() => {
        function getOrder() {
            api.get(`orders/seller/${userUpdate.id}`)
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data);
                        setSales(res.data);
                    }

                }).catch((err) => {
                    console.log(err);
                })
        }

        getOrder();
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
                        <AccountMenu isSeller={true} />
                        <SellerMenu isSeller={true} />
                    </div>

                    <div className="section-orders">
                        <div className="container-orders">
                            <SectionTitle text="Pedidos" />
                            {sales.map(sale => (<SaleBox total={sale.total} date={sale.orderDate} adress={sale.adress} user={sale.user} idOrder={sale.id} orderItems={sale.orderItems} status={sale.orderStatus} />))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
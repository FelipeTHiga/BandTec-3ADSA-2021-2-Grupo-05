import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
import { Button } from '../components/Button';
import '../styles/login.scss';
import '../styles/global.scss';
import { getUser, login } from '../services/crud-user';
import { Link, withRouter } from "react-router-dom";
import {FormLogin} from '../components/FormLogin'

export function Login() {
    return (
            <>
            <Navbar />
            <Submenu />
            <section className="login-section">
            <div className="container-login">
                    <Title title="Login" />
                    <FormLogin/>
                </div>
            </section>
            <Footer />
        </>
    )
}
import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Submenu } from '../components/Submenu';
import { FormLogin } from '../components/FormLogin';

import '../styles/login.scss';
import '../styles/global.scss';

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
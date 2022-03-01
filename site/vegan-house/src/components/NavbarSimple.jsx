import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

import '../styles/navbar.scss'

export function NavbarSimple(props) {

    return (
        <header className="header">
            <div className="container-header">
                <div className="title-site line-up">
                    <Link to="/">
                        <img src={logo} alt="Logo Vegan House" />
                    </Link>
                </div>
            </div>
        </header>
    );
}
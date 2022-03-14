import { Button } from '../components/Button';
import pageNotFound from '../assets/images/pageNotFound.png';
import { Link } from 'react-router-dom';
import { NavbarSimple } from '../components/NavbarSimple';

import '../styles/global.scss';
import '../styles/reset.scss';
import '../styles/pageNotFound.scss';

export function PageNotFound() {

    return (
        <>
            <NavbarSimple></NavbarSimple>
            <div className="page-not-found-container">
                <div className="page-not-found-content">
                    <div className="page-not-found-text">
                        <h1>404</h1>
                        <h3>Ops... recurso não encontrado</h3>
                    </div>
                    <Link to="/">
                        <Button text="Ir para home"></Button>
                    </Link>
                    <img className="page-not-found-img" src={pageNotFound} alt="" />
                </div>
            </div>
        </>
    );
}
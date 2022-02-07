import { Link } from 'react-router-dom';
import '../styles/modal.scss'

function Modal(props, { id = 'modal' }) {

    const handleOutsideClick = (e) => {
        if (e.target.id === id) props.onClose();
    };
    var windownHeight = props.height + "px";

    return (
        <div className="modal-background" style={{height: windownHeight}}> 
            <div id={id} onClick={handleOutsideClick} className="modal">
                <div className="modal-container">
                    <button onClick={props.onClose} className="btn-close" />
                    <div className="modal-content">
                        <h2 className="modal-title">{props.title}</h2>
                        <p className="modal-text">{props.message}</p>
                        <Link to={props.link}>
                            <button className="modal-btn">{props.btnTitle}</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;

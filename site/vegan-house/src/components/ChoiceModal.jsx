import '../styles/modal.scss'

function ChoiceModal(props, { id = 'modal' }) {

    const handleOutsideClick = (e) => {
        if (e.target.id === id) props.onClose();
    };
    var windownHeight = props.height + "px";

    return (
        <div className="modal-background" style={{ height: windownHeight }}>
            <div id={id} onClick={handleOutsideClick} className="modal">
                <div className="modal-container">
                    <button onClick={props.onClose} className="btn-close" />
                    <div className="modal-content">
                        <h2 className="modal-title">{props.title}</h2>
                        <p className="modal-text">{props.message}</p>
                        <div className='container-choice-btn'>
                            <button className="modal-btn" onClick={props.remove}><i class="fas fa-solid fa-check"></i></button>
                            <button className="modal-btn" onClick={props.onClose}><i class="fa-solid fa-xmark"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChoiceModal;

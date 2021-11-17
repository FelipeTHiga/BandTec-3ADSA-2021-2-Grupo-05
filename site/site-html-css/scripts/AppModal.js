// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Modal from './components/Modal';

// function AppModal() {
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     return (
//         <>
//             <div className="Modal">
//                 <button onClick={() => setIsModalVisible(true)}>Open</button>
//                 {isModalVisible ? (
//                     <Modal onClose={() => setIsModalVisible(false)}></Modal>
//                 )
//                     : null}
//             </div>
//         </>
//     );
// }

// export default AppModal;


// const Modal = (props, { id = 'modal', onClose = () => { }}) => {

//     const handleOutsideClick = (e) => {
//         if (e.target.id === id) onClose();
//     };

//     return (
//         <div id={id} onClick={handleOutsideClick} className="modal">
//             <div className="modal-container">
//                 <button onClick={onClose} className="btn-close" />
//                 <div className="modal-content">
//                     <h2 className="modal-title">{props.title}</h2>
//                     <p className="modal-text">{props.message}</p>
//                     <Link to="/login">
//                         <button className="modal-btn">{props.btnTitle}</button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Modal;
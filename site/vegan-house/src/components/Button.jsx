import "../styles/button.scss";
import { Link } from 'react-router-dom';


export function Button(props) {
    return(
        <>
            <button id="button_default" className="button" >{props.text}</button>
        </>
    );
}

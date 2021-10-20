import "../styles/button.scss";
import { Link } from 'react-router-dom';

export function Button(props) {
    return(
        <button className="button" >{props.text}</button>
    );
}
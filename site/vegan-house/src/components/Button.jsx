import "../styles/button.scss";


export function Button(props) {
    return(
        <button onClick={props.function} className="button">{props.text}</button>
    );
}
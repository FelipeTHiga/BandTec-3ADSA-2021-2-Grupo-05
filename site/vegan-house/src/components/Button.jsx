import "../styles/button.scss";


export function Button(props) {
    return(
        <button className="button">{props.text}</button>
    );
}
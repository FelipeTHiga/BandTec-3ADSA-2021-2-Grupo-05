import "../styles/button.scss";


export function Button(props) {
    return(
        <button className="button-default">{props.text}</button>
    );
}
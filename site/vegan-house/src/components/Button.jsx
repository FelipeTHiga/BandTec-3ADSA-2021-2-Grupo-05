import "../styles/button.scss";


export function Button(props) {
    return(
        <>
            <button id="button_default" className="button">{props.text}</button>
        </>
    );
}

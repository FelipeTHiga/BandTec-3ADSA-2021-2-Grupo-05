import '../styles/productTextDescription.scss';

export function ProductTextDescription(props) {
    return(
        <div className="text-description">
        <p>{props.text}</p>
    </div>
    );
}

// myProp={<div><SomeComponent>Some String</div>}
import '../styles/productTextDescription.scss';

export function ProductTextDescription(props) {
    return (
        <div className="text-description">
            <p>{props.description}</p>
        </div>
    );
}


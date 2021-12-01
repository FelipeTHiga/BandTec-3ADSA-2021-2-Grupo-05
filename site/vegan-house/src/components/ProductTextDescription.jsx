import '../styles/productTextDescription.scss';

export function ProductTextDescription(props) {
    return (
        <div className="text-description">
            <textarea  value={props.description} cols="30" rows="30"></textarea>
        </div>
    );
}


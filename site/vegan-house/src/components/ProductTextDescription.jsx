import '../styles/productTextDescription.scss';
import { selectedProduct } from '../scripts/vetor2.js';

const productText = (product) => {
    return (
        <div className="text-description">
            <p>{product.descriptionText}</p>
        </div>
    );
}

export function ProductTextDescription() {
    return (
        selectedProduct.map(productText)
    );
}


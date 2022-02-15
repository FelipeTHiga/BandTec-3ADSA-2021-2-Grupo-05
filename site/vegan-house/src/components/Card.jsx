import '../styles/card.scss'
import { useRef } from 'react'
import { ProductCard } from '../components/ProductCard'
import api from '../services/api';
import { useEffect, useState } from 'react';

function Card() {
    const carroussel = useRef(null);


    const handleLeftClick = (e) => {
        e.preventDefault();
        console.log(carroussel.current.offsetWidth);
        carroussel.current.scrollLeft -= carroussel.current.offsetWidth;

    };

    const handleRigthClick = (e) => {
        e.preventDefault();
        console.log(carroussel.current.offsetWidth);
        carroussel.current.scrollLeft += carroussel.current.offsetWidth;
    };

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function productAll() {
            const res = await api.get("/products/all");
            setProducts(res.data);
            console.log(res.data);
        }

        productAll();
    }, [])


    return (
        <>
            <div className="container">

                <div className="buttons">
                    <button onClick={handleLeftClick}>
                        <i class="arrow fas fa-arrow-left"></i>
                    </button>
                </div>
                <div className="carroussel" ref={carroussel}>
                    {products.map(product => (
                        <ProductCard id={product.id} src={"data:image/jpeg;base64," + product.image_url1} name={product.name} price={product.price} />

                    ))}
                </div>

                <div className="buttons">
                    <button onClick={handleRigthClick}>
                        <i class="arrow fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </>
    );
}

export { Card };


import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    description: string;
    long_description: string;
    feature1: string;
    feature2: string;
    imageUrl: string;
    price: number;
}

interface ProductDetailsProps {
    products: Product[];
}

    const ProductDetails: React.FC<ProductDetailsProps> = ({ products = [] }) => {
    const { id } = useParams<{ id: string }>(); 
    const productId = parseInt(id || '', 10); 

    const product = products.find((prod: Product) => prod.id === productId);
    if (!product) return <p>Product not found!</p>;

    return (
        <Container className="pt-5 pb-5">
            <Row>
                <Col md={6}>
                    <img src={product.imageUrl} alt={product.name} className='pt-5 pe-5' style={{ width: '100%',}} />
                </Col>
                <Col md={6}>
                    <h2 className='fw-bold'>{product.name}</h2>
                    <p className='pt-4'>
                     {product.long_description || product.description}
                    </p>
                    <p>{product.feature1}</p>
                    <p>{product.feature2}</p>
                    <p>Price: ${product.price.toFixed(2)}</p>
                    <Link
                        to={`/store`}
                        className="btn btn-outline-info mx-auto"
                        style={{ color: 'black' }}>
                            Buy it now!
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetails;

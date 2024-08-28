import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    description: string;
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
    if (!product) return <p>Product not found</p>;

    return (
        <Container className="my-5">
            <Row>
                <Col md={6}>
                    <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
                </Col>
                <Col md={6}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${null}</p>
                    <button type="button" className="btn btn-primary">
                        Buy it now!
                    </button>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetails;

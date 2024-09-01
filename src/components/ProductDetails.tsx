import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    description: string;
    long_description: string;
    feature: string;
    end: string,
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

    const splitFeatures = (featureText : string) => {
        return featureText.split('. ').filter(point => point.trim() !== '');
    };

    const featurePoints = splitFeatures(product.feature);

    return (
        <Container className="pt-5 pb-5">
            <Row>
                <Col md={6}>
                    <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className='mt-5 border border-2 border-info' 
                    style={{ width: '100%',}} 
                    />
                </Col>
                <Col md={6}>
                    <h2 className='fw-bold'>{product.name}</h2>
                    <p className='pt-4'>
                     {product.long_description || product.description}
                    </p>
                        <h4 className='fw-bold'>Key Features</h4>
                        <ul>
                            {featurePoints.map((point, index) => (
                                <li key={`feature-${index}`}>{point}</li>
                            ))}
                        </ul>
                    <p>{product.end}</p>
                    <h5 className='pb-3 fw-bold'>Price: ${product.price.toFixed(2)}</h5>
                    <Link
                        to={`/store`}
                        className="btn btn-outline-info btn-lg btn-block mx-auto"
                        style={{ color: 'black' }}>
                            Buy it now!
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetails;

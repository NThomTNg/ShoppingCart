import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import backgroundImage from '/images/front.jpg';

export function Home() {
    return (
        <>
            <Container fluid className="p-0">
                <div
                    className="bg-image"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        height: '400px'
                    }}
                >
                    <div className="mask h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <div className="text-white text-center">
                                <h1 className="display-4 mb-3">Welcome to ComStarCenter</h1>
                                <p className="lead mb-3">The only place you need to find the parts for your machine!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container className="my-5">
                <h2 className="text-center mb-4">Featured Products</h2>
                <Row>
                    {[1, 2, 3, 4].map((product) => (
                        <Col key={product} md={3} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={`${product}`} />
                                <Card.Body>
                                    <Card.Title>Product {product}</Card.Title>
                                    <Card.Text>
                                        Description of product ...
                                    </Card.Text>
                                    <Button variant="primary">View Details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Container fluid className="bg-light py-5">
                <Row>
                    <Col className="text-center">
                        <h2>Ready to build your dream PC?</h2>
                        <p>We have all the components you need to get started.</p>
                        <Button variant="success" size="lg">Start Your Build</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
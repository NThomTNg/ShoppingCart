import { Container, Row, Col, Card } from 'react-bootstrap';
import backgroundImage from '/images/front.jpg';
import { Link } from 'react-router-dom';
import featuredProducts from '../../data/featured';
import footerImage from '/images/foot.jpg';
import './home.css';

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
                    {featuredProducts.map((product) => (
                        <Col key={product.id} md={3} className="mb-4">
                            <Card className='card-hover'>
                                <Card.Img
                                variant="top"
                                src={product.imageUrl}
                                style={{
                                    width: '100%',
                                    height: '250px', 
                                    objectFit: 'cover'
                                }} />
                                <Card.Body className='bg-light'>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        {product.description}
                                    </Card.Text>
                                <div className='d-flex justify-content-center'>
                                <Link
                                to={`/product/${product.id}`}
                                className="btn btn-outline-info mx-auto"
                                style={{ color: 'black' }}>
                                        View Details
                                    </Link>
                                </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Container fluid className="pb-5 pt-4">
                <div
                className="bg-image d-flex align-items-center justify-content-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${footerImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '100%', 
                    minHeight: '200px', 
                 }}
                >
        <Row className="w-100">
            <Col className="text-center text-white">
                <h2>Ready to build your dream PC?</h2>
                <p>We have all the components you need to get started.</p>
                <Link
                to="/store"
                className="btn btn-outline-info btn-lg"
                style={{ color: 'white' }}
                >           
                Start Your Build
                </Link>
            </Col>
        </Row>
    </div>
</Container>
        </>
    );
}

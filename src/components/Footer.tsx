import { Container, Row, Col } from 'react-bootstrap';

const FooterOverlay = () => (
  <footer className="app__footerOverlay bg-dark text-light py-4">
    <Container>
      <Row>
        <Col md={4}>
          <h5>ComStarCenter</h5>
          <p>Your one-stop shop for all computer parts</p>
        </Col>
        <Col md={4}>
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li><a href="/" className="text-light">Home</a></li>
            <li><a href="/products" className="text-light">Products</a></li>
            <li><a href="/about" className="text-light">About Us</a></li>
            <li><a href="/contact" className="text-light">Contact</a></li>
          </ul>
        </Col>
        <Col md={4}>
          <h5>Contact Us</h5>
          <p>Email: info@comstarcenter.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 Tech Street, Computerville, CV 12345</p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="text-center">
          <p>&copy; 2024 ComStarCenter. All rights reserved.</p>
        </Col>
      </Row>
    </Container>
    <div className="app__footerOverlay-black" />
    <div className="app__footerOverlay-img app__bg" />
  </footer>
);

export default FooterOverlay;
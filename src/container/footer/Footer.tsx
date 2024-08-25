import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './Footer.css';

const Footer = () => (
  <footer className="app__footer bg-dark text-light py-5">
    <Container>
      <Row>
        <Col md={4}>
          <h5>ComStarCenter</h5>
          <p>The only place for worthwhile parts!</p>
          <p className = "text-secondary fs-6 fw-light pt-3">We know if you go anywhere else :)</p>
        </Col>
        <Col md={4}>
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li><Link to="/" className="text-light text-decoration-none hover_animation">Home</Link></li>
            <li><Link to="/store" className="text-light text-decoration-none hover_animation">Store</Link></li>
            <li><Link to="/about" className="text-light text-decoration-none hover_animation">About Us</Link></li>
          </ul>
        </Col>
        <Col md={4}>
          <h5>Contact Us</h5>
          <p>Email: PictureComic@comstarcenter.com</p>
          <p>Phone: +(00) 456-7890</p>
          <p>Address: 123 Not This Street, Existville, PC 12345</p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="text-center">
          <p>&copy; Designed by Nhan Thomas Nguyen.</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
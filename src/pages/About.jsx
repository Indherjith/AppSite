import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function About() {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">About AndSite Solutions</h1>

      <Row className="justify-content-center mb-5">
        <Col md={8}>
          <p style={{ textAlign: 'justify' }}>
            AndSite Solutions is a passionate tech startup founded by a team of friends with a shared dream — to empower businesses through innovative digital solutions. 
            We specialize in creating high-quality static and dynamic websites, developing customized e-commerce platforms, hosting services, building Android applications, 
            and helping businesses launch their apps on the Google Play Store.
          </p>
          <p style={{ textAlign: 'justify' }}>
            Our mission is to make technology accessible, affordable, and impactful for businesses of all sizes. With a strong foundation in MERN stack development, 
            Flutter + Firebase app building, and real-world project experience, we are ready to forge the digital future together with our clients.
          </p>
        </Col>
      </Row>

      <h2 className="text-center mb-4">Why Choose Us?</h2>

      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Experienced Team</Card.Title>
              <Card.Text>
                We are a skilled team with expertise in web and mobile app development, combining creativity with technical excellence.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Affordable Pricing</Card.Title>
              <Card.Text>
                We provide top-quality services at competitive prices, perfect for startups, small businesses, and growing enterprises.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>End-to-End Support</Card.Title>
              <Card.Text>
                From initial consultation to deployment and beyond, we stay with you through every step of your digital journey.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;

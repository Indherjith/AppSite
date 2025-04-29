import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Services() {
  const services = [
    {
      title: "Static Website Development",
      description: "Professional, fast-loading, and SEO-friendly static websites for your business."
    },
    {
      title: "Dynamic Website Development",
      description: "Fully functional dynamic websites with admin panels and real-time updates."
    },
    {
      title: "E-commerce Website Development",
      description: "Online stores with product management, secure payments, and user-friendly designs."
    },
    {
      title: "Website Hosting",
      description: "Affordable and reliable web hosting solutions for all types of websites."
    },
    {
      title: "Static Android Applications",
      description: "Lightweight mobile apps without backend, perfect for simple business needs."
    },
    {
      title: "Dynamic Android Applications",
      description: "Fully dynamic apps connected with real-time databases like Firebase."
    },
    {
      title: "Play Store Launch Support",
      description: "We help you publish your Android applications professionally on Google Play Store."
    }
  ];

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Our Services</h1>
      <Row>
        {services.map((service, index) => (
          <Col key={index} md={4} className="d-flex align-items-stretch mb-4">
            <Card className="shadow-sm w-100">
              <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Services;

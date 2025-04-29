import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function StudentProjects() {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Final Year Project Guidance</h1>
      
      <Row className="justify-content-center mb-4">
        <Col md={10}>
          <p style={{ textAlign: 'justify' }}>
            At <strong>AndSite Solutions</strong>, we provide professional guidance to final year students pursuing Computer Science degrees like <strong>BE (CSE)</strong>, 
            <strong> ME (CSE)</strong>, <strong>BSc Computer Science</strong>, and <strong>MSc Computer Science</strong>. Our aim is to help you learn and build your project 
            on your own — with mentorship from experienced developers.
          </p>
          <p style={{ textAlign: 'justify' }}>
            Whether you're working on a web app, mobile app, or a full-stack solution, we help you plan, build, test, and present your final year project with confidence.
            We guide you in using trending technologies like <strong>React.js, Node.js, MongoDB, Flutter, Firebase</strong> and more.
          </p>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Who Can Apply?</Card.Title>
              <Card.Text>
                - BE (CSE), ME (CSE) <br />
                - BSc Computer Science <br />
                - MSc Computer Science <br />
                - Any student interested in real project experience
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Technologies We Guide In</Card.Title>
              <Card.Text>
                - MERN Stack (MongoDB, Express, React, Node.js) <br />
                - Flutter + Firebase <br />
                - REST APIs, Git, UI/UX tools <br />
                - Deployment, Testing & Documentation
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="text-center">
        <Col>
          <h4>Interested in Project Guidance?</h4>
          <p>We’ll help you learn and build — not just copy a project!</p>
          <Button href="/contact" variant="primary">Contact Us</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default StudentProjects;

import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center p-3 mt-auto border-top border-secondary">
    
      <Container className="py-4">
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="text-uppercase font-weight-bold mb-3 text-primary">
              Catálogo de Cursos
            </h5>
            <p className="text-sm text-gray-400">
              ¡La mejor plataforma para tomar cursos y mejorar tus habilidades!
            </p>
          </Col>
        </Row>

        <hr className="my-3 border-gray-700" />

        <div className="text-center text-sm text-gray-500">
          &copy; 2025 Catálogo de Cursos.
          <br/>Angelica Arellanes 
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

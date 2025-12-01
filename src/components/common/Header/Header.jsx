import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaBookOpen, FaHeart, FaPlus } from "react-icons/fa";
import "./header.css";
const Header = () => {
  return (
    <Navbar id="header" bg="dark" expand="lg" className="header" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img
            src="https://abrhilcloud.com/assets/logo_1-2fd19440.svg"
            alt="Logo de la aplicación"
            className="navbar-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto menu-seccions">
            <Nav.Link as={NavLink} to="/" end>
              <FaBookOpen className="me-2" />
              Cursos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/favorites">
              <FaHeart className="me-1" />
              Favoritos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/create">
              <FaPlus className="me-1" />
              Crear Curso
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

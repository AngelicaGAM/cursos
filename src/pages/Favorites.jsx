import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { useCourses } from "../hooks/useCourses";
import CourseCard from "../components/CourseCard/CourseCard";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const { favoriteCourses } = useCourses();
  const navigate = useNavigate();

  return (
    <Container className="my-5">
      {favoriteCourses.length === 0 ? (
        <Alert variant="info" className="text-center py-4 shadow-sm">
          <h4 className="alert-heading">¡Aún no tienes cursos favoritos!</h4>
          <Button
            variant="primary"
            onClick={() => navigate("/")}
            className="mt-3"
          >
            Home
          </Button>
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {favoriteCourses &&
            favoriteCourses.map((course) => (
              <Col key={course.id}>
                <CourseCard course={course} />
              </Col>
            ))}
        </Row>
      )}
    </Container>
  );
};

export default FavoritesPage;

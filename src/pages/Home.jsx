import { useState } from "react";
import { Link } from "react-router-dom";
import { useCourses } from "../hooks/useCourses";
import { FaFilter } from "react-icons/fa";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { Button, Collapse } from "react-bootstrap";
import CourseCard from "../components/CourseCard/CourseCard";
import SearchAndFilters from "../components/common/SearchAndFilters";

const Home = () => {
  const { courses } = useCourses();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-end mb-3 gap-4">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          aria-controls="filters-collapse"
          aria-expanded={showFilters}
          variant="primary"
          className="h-20"
          title={
            showFilters
              ? "Ocultar la sección de filtros"
              : "Mostrar la sección de filtros"
          }
        >
          {showFilters ? (
            <FaFilterCircleXmark className="me-2" />
          ) : (
            <FaFilter className="me-2" />
          )}

          {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
        </Button>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/create" className="btn btn-primary">
            + Crear Nuevo Curso
          </Link>
        </div>
      </div>
      <Collapse in={showFilters}>
        <div id="filters-collapse" className="mb-4">
          <SearchAndFilters />
        </div>
      </Collapse>

      <div className="row g-4">
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="col-md-6 col-lg-4">
              <CourseCard course={course} />
            </div>
          ))
        ) : (
          <div className="alert alert-info">
            No se encontraron cursos con los filtros y búsqueda aplicados.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

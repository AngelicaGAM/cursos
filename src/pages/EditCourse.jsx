import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourses } from "../hooks/useCourses";
import CourseForm from "../components/CourseForm/CourseForm";
import { Container, Alert, Spinner } from "react-bootstrap";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, updateCourse } = useCourses();
  const { courseData, loading, error } = useMemo(() => {
    if (!courses || courses.length === 0) {
      return { courseData: null, loading: true, error: null };
    }

    const courseToEdit = courses.find((course) => course.id == id);
    if (courseToEdit) {
      return {
        courseData: {
          ...courseToEdit,
          startDate: new Date(courseToEdit.startDate)
            .toISOString()
            .substring(0, 10),
        },
        loading: false,
        error: null,
      };
    }

    return {
      courseData: null,
      loading: false,
      error: "Curso no encontrado. Verifique la ID.",
    };
  }, [id, courses]);

  const handleEditSubmit = (formData) => {
    updateCourse(formData);
    navigate("/home");
  };

  const handleCancel = () => {
    navigate("/home");
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Cargando curso...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!courseData) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          No se pudo cargar la información del curso. Revise la consola.
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <CourseForm
        initialData={courseData}
        onSubmit={handleEditSubmit}
        onCancel={handleCancel}
      />
    </Container>
  );
};

export default EditCourse;

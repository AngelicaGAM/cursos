import { useState } from "react";
import { Card, Button, Badge, Modal } from "react-bootstrap";
import { FaHeart, FaEye, FaRegHeart, FaEdit, FaTrash } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useCourses } from "../../hooks/useCourses";
import ConfirmationModal from "../common/ConfirmationModal";
import './courseCard.css';

const CourseCard = ({ course }) => {
  const { toggleFavorite, deleteCourse } = useCourses();
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleToggleFavorite = () => {
    toggleFavorite(course.id);
  };

  const handleEdit = () => {
    navigate(`/edit/${course.id}`);
  };

  const handleDetails = () => {
    navigate(`/course/${course.id}`);
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteCourse(course.id);
    setShowModal(false);

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {showAlert && (
        <Alert
          variant="success"
          className="position-fixed top-0 start-50 translate-middle-x mt-3"
          style={{ zIndex: 1050 }}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          Curso **"{course.title}"** eliminado con éxito.
        </Alert>
      )}
      <Card className="shadow-sm h-100">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start">
            <Card.Title className="mb-2">{course.title}</Card.Title>
            <Button
              variant="link"
              onClick={handleToggleFavorite}
              className="p-0"
              style={{ color: course.isFavorite ? "red" : "#ccc" }}
            >
              {course.isFavorite ? (
                <FaHeart size={20} />
              ) : (
                <FaRegHeart size={20} />
              )}
            </Button>
          </div>

          <Card.Subtitle className="d-flex mb-2 subtitle">
            Instructor: {course.instructor}
          </Card.Subtitle>

          <div className="mb-3">
            <Badge pill  bg="primary" className="me-2">
              {course.category}
            </Badge>
            <Badge pill bg="info" className="me-2">
              {course.level}
            </Badge>
          </div>

          <Card.Text
            className="small text-truncate"
            style={{ maxHeight: "4.5em", overflow: "hidden" }}
          >
            {course.description}
          </Card.Text>

          <ul className="list-unstyled small mt-2">
            <li>
              Duración: <strong>{course.duration}</strong>
            </li>
            <li>
              Fecha Inicio: <strong>{course.startDate}</strong>
            </li>
          </ul>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center gap-2">
         <Button
            variant="primary"
            size="sm"
            className="me-2"
            onClick={handleDetails}
          >
            <FaEye /> 
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="me-2"
            onClick={handleEdit}
          >
            <FaEdit /> 
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDeleteClick}
          >
            <FaTrash /> 
          </Button>
        </Card.Footer>
      </Card>
      <ConfirmationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={confirmDelete}
        title="Confirmar Eliminación"
        bodyText={`¿Estás seguro de que deseas eliminar el curso: "${course.title}"?`}
        confirmText="Sí, Eliminar Curso"
      />
    </>
  );
};

export default CourseCard;

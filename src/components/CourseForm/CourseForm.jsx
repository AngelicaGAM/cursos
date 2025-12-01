import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useCourses } from "../../hooks/useCourses";
import "./CourseForm.css";

const CourseForm = ({ initialData, onSubmit, onCancel }) => {
  const { courseCategories, courseLevels } = useCourses();
  const isEditing = !!initialData;
  const defaultFormData = {
    title: "",
    description: "",
    instructor: "",
    duration: "",
    level: courseLevels ? courseLevels[0] : "Principiante",
    category: courseCategories ? courseCategories[0] : "",
    startDate: new Date().toISOString().substring(0, 10),
  };

  const [formData, setFormData] = useState(initialData || defaultFormData);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    const { title, description, instructor, duration, category, startDate } =
      formData;

    if (!title || title.length < 3) {
      newErrors.title =
        "El título es requerido y debe tener al menos 3 caracteres.";
    }
    if (!description || description.length < 10) {
      newErrors.description =
        "La descripción es requerida y debe tener al menos 10 caracteres.";
    }
    if (!instructor) {
      newErrors.instructor = "El nombre del instructor es requerido.";
    }
    if (!duration) {
      newErrors.duration =
        'La duración es requerida (ej: "8 horas" o "4 semanas").';
    }
    if (!category) {
      newErrors.category = "Debe seleccionar una categoría.";
    }
    if (!startDate) {
      newErrors.startDate = "Debe seleccionar una fecha de inicio.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const formTitle = isEditing ? "Editar Curso" : "Crear Curso";
  const submitButtonText = isEditing ? "Guardar Cambios" : "Crear Curso";

  return (
    <div className="course-form-container">
      <Form onSubmit={handleSubmit} className="p-5">
        <h3 className=" form-header">{formTitle}</h3>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label className="form-label-custom">Título</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Ingrese el título completo del curso"
            value={formData.title}
            onChange={handleChange}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="formDescription">
          <Form.Label className="form-label-custom">Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            placeholder="Detalles sobre el contenido y objetivos del curso"
            value={formData.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formInstructor">
          <Form.Label className="form-label-custom">Instructor</Form.Label>
          <Form.Control
            type="text"
            name="instructor"
            placeholder="Nombre del instructor"
            value={formData.instructor}
            onChange={handleChange}
            isInvalid={!!errors.instructor}
          />
          <Form.Control.Feedback type="invalid">
            {errors.instructor}
          </Form.Control.Feedback>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formCategory" md={6}>
            <Form.Label className="form-label-custom">Categoría</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              isInvalid={!!errors.category}
            >
              <option value="">Seleccione Categoría </option>

              {courseCategories &&
                courseCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="formLevel" md={6}>
            <Form.Label className="form-label-custom">Nivel</Form.Label>
            <Form.Select
              name="level"
              value={formData.level}
              onChange={handleChange}
            >
              {courseLevels &&
                courseLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Group as={Col} controlId="formDuration" md={6}>
            <Form.Label className="form-label-custom">Duración</Form.Label>
            <Form.Control
              type="text"
              name="duration"
              placeholder=""
              value={formData.duration}
              onChange={handleChange}
              isInvalid={!!errors.duration}
            />
            <Form.Control.Feedback type="invalid">
              {errors.duration}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formStartDate" md={6}>
            <Form.Label className="form-label-custom">
              Fecha de Inicio
            </Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              isInvalid={!!errors.startDate}
            />
            <Form.Control.Feedback type="invalid">
              {errors.startDate}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <div className="d-flex justify-content-end form-buttons-container">
          <Button variant="secondary" onClick={onCancel} className="me-2">
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="save-button-custom"
          >
            {submitButtonText}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CourseForm;

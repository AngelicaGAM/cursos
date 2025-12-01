import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourses } from "../hooks/useCourses";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses } = useCourses();

  const selectedCourse = useMemo(() => {
    return courses.find((c) => String(c.id) === String(id)) || null;
  }, [id, courses]);

  if (!selectedCourse) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-warning p-5" role="alert">
          <h4 className="alert-heading"> ¡Curso no encontrado! </h4>
          <p>
            Lo sentimos, el ID "{id}" no corresponde a ningún curso en nuestro
            catálogo.
          </p>
          <hr />
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Explorar nuestro catálogo de cursos
          </button>
        </div>
      </div>
    );
  }

  const {
    title,
    description,
    instructor,
    level,
    category,
    modules,
  } = selectedCourse;

  return (
    <div className="container my-5">
      <div className="">
        <h1 className="mb-2 text-primary">{title}</h1>
        <p className="lead text-secondary">{description}</p>

        <div className="d-flex align-items-center mb-4">
          <span className="badge bg-info text-dark me-3">{category}</span>
          <span className="badge bg-warning text-dark me-3">
            Nivel: {level}
          </span>
          <span className="text-muted">Por: **{instructor}**</span>
        </div>

        <hr className="mt-5" />

        <h3 className="mb-4">📚 Contenido del Curso</h3>
        {modules && modules.length > 0 ? (
          <div className="accordion" id="courseModulesAccordion">
            {modules.map((module, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded="false"
                    aria-controls={`collapse${index}`}
                  >
                    **Módulo {index + 1}:** {module.title} (
                    {module.duration || "N/A"})
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${index}`}
                  data-bs-parent="#courseModulesAccordion"
                >
                  <div className="accordion-body">
                    {module.lessons ? (
                      <ul className="list-group list-group-flush">
                        {module.lessons.map((lesson, idx) => (
                          <li key={idx} className="list-group-item">
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>
                        {module.description ||
                          "Sin descripción detallada de lecciones."}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">
            Aún no hay una estructura modular detallada.
          </p>
        )}
      </div>

      <div className="mt-5 pt-3 border-top text-center">
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
    </div>
  );
};

export default CourseDetail;

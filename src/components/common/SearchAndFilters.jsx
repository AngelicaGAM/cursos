import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { useCourses } from "../../hooks/useCourses";

const SearchAndFilters = () => {
  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    courseCategories,
    courseLevels,
  } = useCourses();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilters({ category: "", level: "" });
  };

  const isFilterActive = searchTerm || filters.category || filters.level;

  return (
    <div className="mb-5 p-3 rounded shadow-sm box-filters">
      <Row className="g-3 align-items-end">
        <Col md={12} lg={4}>
          <Form.Group>
            <Form.Label className="fw-bold">Búsqueda</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar cursos por titulo o instructor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                variant="primary"
                onClick={() => setSearchTerm("")}
                disabled={!searchTerm}
              >
                &times;
              </Button>
            </InputGroup>
          </Form.Group>
        </Col>

        <Col md={6} lg={3}>
          <Form.Group>
            <Form.Label className="fw-bold">Categoría</Form.Label>
            <Form.Select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">Todas las Categorías</option>
              {courseCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6} lg={3}>
          <Form.Group>
            <Form.Label className="fw-bold">Nivel</Form.Label>
            <Form.Select
              name="level"
              value={filters.level}
              onChange={handleFilterChange}
            >
              <option value="">Todos los Niveles</option>
              {courseLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={12} lg={2}>
          <Button
            variant="primary"
            onClick={handleClearFilters}
            className="w-100 mt-2 mt-lg-0"
            disabled={!isFilterActive}
          >
            Reiniciar Filtros
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SearchAndFilters;

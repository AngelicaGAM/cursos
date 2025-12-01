import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "../src/components/common/Header/Header";
import Footer from "../src/components/common/Footer";
import Home from "./pages/Home";
import Create from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";
import Favorites from "./pages/Favorites";
import CourseDetail from "./pages/CourseDetail";

import "./App.css";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 py-4">
        <Container fluid className="mb-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<EditCourse />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            CourseDetail
          </Routes>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default App;

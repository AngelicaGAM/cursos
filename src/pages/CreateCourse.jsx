import { useNavigate } from "react-router-dom";
import { useCourses } from "../hooks/useCourses";
import CourseForm from "../components/CourseForm/CourseForm";

const Create = () => {
  const navigate = useNavigate();
  const { addCourse } = useCourses();

  const handleAddCourse = (newCourseData) => {
    addCourse(newCourseData);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };
  return (
    <div className="container mt-4">
      <div className="row g-4">
        <CourseForm 
         onSubmit={handleAddCourse} 
         onCancel={handleCancel} 
         initialData={null}
         />
      </div>
    </div>
  );
};

export default Create;

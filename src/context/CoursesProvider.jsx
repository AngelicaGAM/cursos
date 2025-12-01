import { useState, useMemo, useCallback, useEffect } from "react";
import { CoursesContext } from "./CoursesContext";
import { v4 as uuidv4 } from "uuid";
import initialCoursesData from "../utils/initialCourses.json";

const STORAGE_KEY_COURSES = "courseCatalogCourses";

const initializeCourses = () => {
  try {
    const localData = localStorage.getItem(STORAGE_KEY_COURSES);
    if (localData) {
      return JSON.parse(localData);
    }
  } catch (error) {
    console.error("Error al cargar datos de localStorage:", error);
  }

  return initialCoursesData.courses.map((c) => ({
    ...c,
    id: c.id || uuidv4(),
    isFavorite: c.isFavorite || false,
  }));
};

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState(initializeCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ category: "", level: "" });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(courses));
    } catch (error) {
      console.error("Error al guardar datos en localStorage:", error);
    }
  }, [courses]);

  const addCourse = useCallback((newCourseData) => {
    const newCourse = {
      id: uuidv4(),
      isFavorite: false,
      ...newCourseData,
    };

    setCourses((prevCourses) => [...prevCourses, newCourse]);
    console.log("Curso añadido:", newCourse.title);
  }, []);

  const filteredCourses = useMemo(() => {
    let filtered = courses;
    if (filters.category) {
      filtered = filtered.filter((c) => c.category === filters.category);
    }
    if (filters.level) {
      filtered = filtered.filter((c) => c.level === filters.level);
    }

    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(lowerCaseSearch) ||
          c.instructor.toLowerCase().includes(lowerCaseSearch)
      );
    }
    return filtered;
  }, [courses, filters, searchTerm]);

  const deleteCourse = useCallback((idToDelete) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== idToDelete)
    );
  }, []);

  const toggleFavorite = useCallback((idToToggle) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id === idToToggle) {
          return { ...course, isFavorite: !course.isFavorite };
        }
        return course;
      })
    );
  }, []);

  const updateCourse = useCallback((updatedCourse) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === updatedCourse.id
          ? { ...course, ...updatedCourse }
          : course
      )
    );
    console.log(`Curso actualizado: ${updatedCourse.title}`);
  }, []);

  const favoriteCourses = useMemo(() => {
    return courses.filter((course) => course.isFavorite);
  }, [courses]);

  const DEFAULT_CATEGORIES = initialCoursesData.categoty;
  const DEFAULT_LEVELS = initialCoursesData.levels;

  const contextValue = {
    courses: filteredCourses,
    favoriteCourses,
    courseCategories: DEFAULT_CATEGORIES,
    courseLevels: DEFAULT_LEVELS,
    toggleFavorite,
    searchTerm,
    filters,
    setSearchTerm,
    setFilters,
    addCourse,
    deleteCourse,
    updateCourse,
  };

  return (
    <CoursesContext.Provider value={contextValue}>
      {children}
    </CoursesContext.Provider>
  );
};

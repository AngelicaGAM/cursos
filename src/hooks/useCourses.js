import { useContext } from 'react';
import { CoursesContext } from '../context/CoursesContext'; 

export const useCourses = () => {
    const context = useContext(CoursesContext);
    if (context === undefined) {
        throw new Error('useCourses debe ser usado dentro de un CoursesProvider');
    }
    return context;
};
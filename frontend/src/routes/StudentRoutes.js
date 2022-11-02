import { lazy } from 'react';

// project imports
import StudentLayout from 'layout/StudentLayout';
import Loadable from 'ui-component/Loadable';

import PrivateRoute from 'components/PrivateRoute';
// sample page routing
const StudentHome = Loadable(lazy(() => import('views/student/StudentHome')));
const StudentProfile = Loadable(lazy(() => import('views/student/StudentProfile')));
const StudentLesson = Loadable(lazy(() => import('views/student/StudentLesson')));
const StudentClass = Loadable(lazy(() => import('views/student/StudentClass')));
const StudentCalendar = Loadable(lazy(() => import('views/student/StudentCalendar')));
const TeacherNews = Loadable(lazy(() => import('views/teacher/TeacherNews')))
const StudentTestQuestion = Loadable(lazy(() => import('views/student/StudentTestQuestion')))

// ==============================|| MAIN ROUTING ||============================== //

const StudentRoutes = {
    path: '/',
    element: <PrivateRoute><StudentLayout /></PrivateRoute>,
    children: [
        {
            path: '/student/home',
            element: <StudentHome />
        },
        {
            path: '/student/profile',
            element: <StudentProfile />
        },
        {
            path: '/student/class',
            element: <StudentClass />
        },
        {
            path: '/student/calendar',
            element: <StudentCalendar />
        },
        {
            path: '/student/news',
            element: <TeacherNews />
        },
        {
            path: '/student/lesson',
            element: <StudentLesson />
        },
        {
            path: '/student/question-test/:id',
            element: <StudentTestQuestion />
        }
    ]
};

export default StudentRoutes;

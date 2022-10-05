import { lazy } from 'react';

// project imports
import TeacherLayout from 'layout/TeacherLayout';
import Loadable from 'ui-component/Loadable';



// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')))
const TeacherWeekLesson = Loadable(lazy(() => import('views/teacher/TeacherWeekLesson')))
const ClassCalendar = Loadable(lazy(() => import('views/teacher/ClassCalendar')))
const TeacherRoute = Loadable(lazy(() => import('views/teacher/TeacherRoute')))
const SubjectTeacherClass = Loadable(lazy(() => import('views/teacher/SubjectTeacherClass')))
const TeacherClass = Loadable(lazy(() => import('views/teacher/TeacherClass')))
const TeacherHome = Loadable(lazy(() => import('views/teacher/TeacherHome')))
const LinkEdit = Loadable(lazy(() => import('views/teacher/LinkEdit')))
// ==============================|| MAIN ROUTING ||============================== //

const TeacherRoutes = {
    path: '/', 
    element: <TeacherLayout />,
    children: [
        {
            path: '/teacher/weeklesson/:classID',
            element: <TeacherWeekLesson />
        },
        {
            path: '/teacher/classCalendar',
            element: <ClassCalendar />
        },
        {
            path: '/teacher/teacher-route',
            element: <TeacherRoute />
        },
        {
            path: '/teacher/subject-teacher-class',
            element: <SubjectTeacherClass />
        },
        {
            path: '/teacher/class',
            element: <TeacherClass />
        },
        {
            path: '/teacher/home',
            element: <TeacherHome />
        },
        {
            path: '/teacher/linkedit',
            element: <LinkEdit />
        }
    ]
};

export default TeacherRoutes;

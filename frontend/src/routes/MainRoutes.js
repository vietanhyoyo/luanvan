import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')))
const AdminAccount = Loadable(lazy(() => import('views/admin/AdminAccount')))
const TeacherAccount = Loadable(lazy(() => import('views/admin/TeacherAccount')))
const StudentAccount = Loadable(lazy(() => import('views/admin/StudentAccount')))
const AdminProfile = Loadable(lazy(() => import('views/admin/AdminProflie')))
const GradeManager = Loadable(lazy(() => import('views/admin/GradeManager')))
const ClassManager = Loadable(lazy(() => import('views/admin/ClassManager')))
const SchoolYear = Loadable(lazy(() => import('views/admin/SchoolYear')))
const AddTeacher = Loadable(lazy(() => import('views/admin/AddTeacher')))
const UpdateTeacher = Loadable(lazy(() => import('views/admin/UpdateTeacher')))
const AddStudent = Loadable(lazy(() => import('views/admin/AddStudent')))
const UpdateStudent = Loadable(lazy(() => import('views/admin/UpdateStudent')))
const EditSchedule = Loadable(lazy(() => import('views/admin/EditSchedule')))
const ScheduleList = Loadable(lazy(() => import('views/admin/ScheduleList')))
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/utils/util-typography',
            element: <UtilsTypography />
        },
        {
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '/manager/admin',
            element: <AdminAccount />
        },
        {
            path: '/manager/teacher',
            element: <TeacherAccount />
        },
        {
            path: '/manager/student',
            element: <StudentAccount />
        },
        {
            path: '/manager/profile',
            element: <AdminProfile />
        },
        {
            path: '/manager/class',
            element: <ClassManager />
        },
        {
            path: '/manager/school-year',
            element: <SchoolYear />
        },
        {
            path: '/manager/add-teacher',
            element: <AddTeacher />
        },
        {
            path: '/manager/update-teacher/:id',
            element: <UpdateTeacher />
        },
        {
            path: '/manager/add-student',
            element: <AddStudent />
        },
        {
            path: '/manager/update-student/:id',
            element: <UpdateStudent />
        },
        {
            path: '/manager/grade',
            element: <GradeManager />
        },
        {
            path: '/manager/edit-schedule/:id',
            element: <EditSchedule />
        },
        {
            path: '/manager/schedule',
            element: <ScheduleList />
        }
    ]
};

export default MainRoutes;

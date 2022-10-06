import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import StudentRoutes from './StudentRoutes';
import TeacherRoutes from './TeacherRoutes'
import config from 'config';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([AuthenticationRoutes, StudentRoutes, MainRoutes, TeacherRoutes ], config.basename);
}

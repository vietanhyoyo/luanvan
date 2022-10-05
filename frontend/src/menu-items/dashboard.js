// assets
import { IconDashboard, IconWindow } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconWindow };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Quản lý',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Thống kê',
            type: 'item',
            url: '/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'school-class',
            title: 'Lớp - học kì',
            type: 'collapse',
            icon: icons.IconWindow,
            children: [
                {
                    id: 'grade',
                    title: 'Khối',
                    type: 'item',
                    url: '/manager/grade',
                },
                {
                    id: 'schoolyear',
                    title: 'Năm học',
                    type: 'item',
                    url: '/manager/school-year',
                },
                {
                    id: 'class',
                    title: 'Lớp học',
                    type: 'item',
                    url: '/manager/class',
                },
            ]
        }
    ]
};

export default dashboard;

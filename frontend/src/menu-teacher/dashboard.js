// assets
import { IconBook2, IconCalendarTime, IconBorderAll } from '@tabler/icons';
// constant
const icons = { IconBook2,IconCalendarTime, IconBorderAll  };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Giảng dạy',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Thời khóa biểu',
            type: 'item',
            url: '/teacher/classCalendar',
            icon: icons.IconCalendarTime,
            breadcrumbs: false
        },
        {
            id: 'classroom',
            title: 'Lớp chủ nhiệm',
            type: 'item',
            url: '/teacher/class',
            icon: icons.IconBorderAll,
            breadcrumbs: false
        },
        {
            id: 'lesson',
            title: 'Nội dung bài giảng',
            type: 'item',
            url: '/teacher/home',
            icon: icons.IconBook2,
            breadcrumbs: false
        }
    ]
};

export default dashboard;

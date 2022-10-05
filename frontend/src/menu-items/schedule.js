// assets
import {
    IconCalendarTime
} from '@tabler/icons';

// constant
const icons = {
    IconCalendarTime
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const schedule = {
    id: 'schedule',
    title: 'Thời khóa biểu',
    type: 'group',
    children: [
        {
            id: 'schedule-update',
            title: 'Cập nhật TKB',
            type: 'item',
            url: '/manager/schedule',
            icon: icons.IconCalendarTime,
            breadcrumbs: false
        }
    ]
};

export default schedule;

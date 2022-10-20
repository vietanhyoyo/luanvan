// assets
import {
    IconCalendarTime,
    IconBrandAppleArcade
} from '@tabler/icons';

// constant
const icons = {
    IconCalendarTime,
    IconBrandAppleArcade
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const schedule = {
    id: 'schedule',
    title: 'Khác',
    type: 'group',
    children: [
        {
            id: 'schedule-update',
            title: 'Cập nhật TKB',
            type: 'item',
            url: '/manager/schedule',
            icon: icons.IconCalendarTime,
            breadcrumbs: false
        },
        {
            id: 'manage-update',
            title: 'Trạng thái dạy học',
            type: 'item',
            url: '/manager/manage-update',
            icon: icons.IconBrandAppleArcade,
            breadcrumbs: false
        }
    ]
};

export default schedule;

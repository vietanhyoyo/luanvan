// assets
import {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconArtboard,
    IconBook,
    IconSchool
} from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconArtboard,
    IconBook,
    IconSchool
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const accounts = {
    id: 'accounts',
    title: 'Tài khoản',
    type: 'group',
    children: [
        {
            id: 'manageradmin',
            title: 'Quản trị',
            type: 'item',
            url: '/manager/admin',
            icon: icons.IconArtboard,
            breadcrumbs: false
        },
        {
            id: 'managerteacher',
            title: 'Giáo viên',
            type: 'item',
            url: '/manager/teacher',
            icon: icons.IconBook,
            breadcrumbs: false
        },
        {
            id: 'managerstudent',
            title: 'Học sinh',
            type: 'item',
            url: '/manager/student',
            icon: icons.IconSchool,
            breadcrumbs: false
        }
    ]
};

export default accounts;

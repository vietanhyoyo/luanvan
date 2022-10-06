// assets
import {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconArtboard,
    IconBook,
    IconSchool,
    IconId,
    IconKey
} from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconArtboard,
    IconBook,
    IconSchool,
    IconId,
    IconKey
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const accounts = {
    id: 'accounts',
    title: 'Tài khoản',
    type: 'group',
    children: [
        {
            id: 'manageradmin',
            title: 'Thông tin cá nhân',
            type: 'item',
            url: '/student/profile',
            icon: icons.IconId,
            breadcrumbs: false
        },
        {
            id: 'managerteacher',
            title: 'Đổi mật khẩu',
            type: 'item',
            url: '/student/profile',
            icon: icons.IconKey,
            breadcrumbs: false
        }
    ]
};

export default accounts;

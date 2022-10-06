// assets
import {
    IconLink
} from '@tabler/icons';

// constant
const icons = {
    IconLink
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const accounts = {
    id: 'accounts',
    title: 'Thiết lập',
    type: 'group',
    children: [
        {
            id: 'manageradmin',
            title: 'Quản lý đường link',
            type: 'item',
            url: '/teacher/linkedit',
            icon: icons.IconLink,
            breadcrumbs: false
        }
    ]
};

export default accounts;

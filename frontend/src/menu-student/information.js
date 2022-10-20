// assets
import {
    IconWorld
} from '@tabler/icons';

// constant
const icons = {
    IconWorld
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const information = {
    id: 'information',
    title: 'Thông tin',
    type: 'group',
    children: [
        {
            id: 'news',
            title: 'Bản tin',
            type: 'item',
            url: '/student/home',
            icon: icons.IconWorld,
            breadcrumbs: false
        }
    ]
};

export default information;

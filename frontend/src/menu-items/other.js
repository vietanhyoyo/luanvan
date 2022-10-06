// assets
import {
    IconBrandChrome,
    IconHelp,
    IconHome
} from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome,
    IconHelp,
    IconHome
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: 'Sample Page',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'documentation',
            title: 'Documentation',
            type: 'item',
            url: 'https://codedthemes.gitbook.io/berry/',
            icon: icons.IconHelp,
            external: true,
            target: true
        },
        {
            id: 'student-home',
            title: 'Home',
            type: 'item',
            url: '/student/home',
            icon: icons.IconHome,
            breadcrumbs: false
        }
    ]
};

export default other;

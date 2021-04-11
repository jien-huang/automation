import { Configuration } from './Configuration';
import Results from './Results';
import { Tests } from './Tests';

const Routes = [
  {
    path: '/',
    sidebarName: 'Results',
    icon: 'dashboard',
    component: Results
  },
  {
    path: '/tests',
    sidebarName: 'Tests',
    icon: 'view_list',
    component: Tests
  },
  {
    path: '/configuration',
    sidebarName: 'Configuration',
    icon: 'build',
    component: Configuration
  },
];

export default Routes;
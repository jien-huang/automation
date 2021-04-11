import { Configuration } from './components/Configuration';
import Results from './components/Results';
import { Tests } from './components/Tests';

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
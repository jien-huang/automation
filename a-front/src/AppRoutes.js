import { Configuration } from './components/Configuration';
import Results from './components/Results';
import OneResult from './components/OneResult';
import { Tests } from './components/Tests';

const AppRoutes = [
  {
    path: '/',
    sidebarName: 'Results',
    icon: 'dashboard',
    component: Results
  },
  {
    path: '/results/oneResult/:id',
    component: OneResult
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

export default AppRoutes;
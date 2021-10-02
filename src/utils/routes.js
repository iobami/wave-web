import Waves from '../pages/waves';
import Menu from '../pages/menu';
import Mints from '../pages/mints';

export const routes = {
  dashboardEntry: {
    path: '/',
    component: Waves,
  },
  menu: {
    path: '/menu',
    component: Menu,
  },
  mints: {
    path: '/mints',
    component: Mints,
  },
};

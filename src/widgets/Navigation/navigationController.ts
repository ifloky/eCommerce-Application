import { navigationView } from './navigationView';

const navigationElements = [
  { link: '/', nameLink: 'Main' },
  { link: '/about', nameLink: 'about us' },
  { link: '/catalog', nameLink: 'catalog' },
];

function renderNavigation(): string {
  const navigationWrapper = navigationView(navigationElements);
  return navigationWrapper;
}

const Navigation = {
  render: renderNavigation,
};

export default Navigation;

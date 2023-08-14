import { navigationView } from "./navigationView";

const navigationElements = [
  { link: '/', nameLink: 'Main' },
  { link: '/about', nameLink: 'about' },
  { link: '/catalog', nameLink: 'catalog' },
  { link: '/404', nameLink: '404' },
];



function renderNavigation(): string {
  const navigationWrapper = navigationView(navigationElements);
  return navigationWrapper
}

const Navigation = {
  render: renderNavigation,
};

export default Navigation;
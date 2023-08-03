import { loadPage, navigateTo } from './utils/router';
import { ContactsController } from './controllers/ContactsController';
import { MainController } from './controllers/MainController';

const routes: { [key: string]: () => void } = {
  '/': MainController,
  '/contacts': ContactsController,
};

export function initializeApp() {
  setupListeners();
  handleNavigation();
}

function setupListeners() {
  const links = document.querySelectorAll('a[data-link]');
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.target as HTMLAnchorElement;
      navigateTo(target.href);
    });
  });
  window.addEventListener('popstate', handleNavigation);
}

function handleNavigation() {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = '<div>Loading...</div>';
  }
  const path = window.location.pathname;
  const routeHandler = routes[path];
  if (routeHandler) {
    routeHandler();
  } else {
    loadPage('404 Motherfackers');
  }
}

export { routes };
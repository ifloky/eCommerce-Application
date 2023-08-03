import { routes } from '../app';

export function loadPage(content: string) {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = content;
  }
}

export function navigateTo(url: string) {
  window.history.pushState({}, '', url);
  handleNavigation();
}

export function handleNavigation() {
  const path = window.location.pathname;
  const routeHandler = routes[path];
  if (routeHandler) {
    routeHandler();
  } else {
    loadPage('Not Found');
  }
}
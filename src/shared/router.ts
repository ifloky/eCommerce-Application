/* eslint-disable no-use-before-define */
import { MainPageController } from "../pages/mainPage/MainPageController";

type ControllerFunction = () => void;

function createControllerFunction(renderFunction: ControllerFunction): ControllerFunction {
  return renderFunction;
}

function popstateHandler(): void {
  handleRoute();
}

window.addEventListener('popstate', popstateHandler);

function updateContainer(content: string): void {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.innerHTML = content;
  }
}

function homeController(): void {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.innerHTML = MainPageController();
  }
}

function logInController(): void {
  updateContainer('<div class="main-container"><h1>Login Page</h1></div>');
}

function registerController(): void {
  updateContainer('<div class="main-container"><h1>Register Page</h1></div>');
}

function notFoundController(): void {
  updateContainer('<div class="main-container"><h1>404 - Page Not Found</h1></div>');
}

const routes: { [path: string]: ControllerFunction } = {
  '/': createControllerFunction(homeController),
  '/login': createControllerFunction(logInController),
  '/register': createControllerFunction(registerController),
};

function handleRoute(): void {
  const currentPath = window.location.pathname;
  const controller = routes[currentPath] || notFoundController;
  controller();
}

export function startRouting(): void {
  function changeRoute(path: string): void {
    window.history.pushState({}, '', path);
    handleRoute();
  }

  const links = document.querySelectorAll('a');
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const href = link.getAttribute('href');
      if (href) {
        changeRoute(href);
      }
    });
  });

  window.removeEventListener('popstate', popstateHandler);
  window.addEventListener('popstate', popstateHandler);
}

startRouting();

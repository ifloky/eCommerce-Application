/* eslint-disable no-use-before-define */
import { MainPageController } from "../pages/mainPage/MainPageController";
import { headerController } from "../widgets/header/headerController";

type ControllerFunction = () => void;

function createControllerFunction(renderFunction: ControllerFunction): ControllerFunction {
  return renderFunction;
}

const appWrapper = document.body

function homeController(): void {
  appWrapper.innerHTML = headerController()
  appWrapper.innerHTML += MainPageController()
  startRouting()
}

function logInController(): void {
  appWrapper.innerHTML = headerController()
  appWrapper.innerHTML += '<div class="main-container"><h1>Login Page</h1></div>';
  startRouting()
}

function registerController(): void {
  appWrapper.innerHTML = headerController()
  appWrapper.innerHTML += '<div class="main-container"><h1>Register Page</h1></div>';
  startRouting()
}

function aboutController(): void {
  appWrapper.innerHTML = headerController()
  appWrapper.innerHTML += '<div class="main-container"><h1>About Page</h1></div>';
  startRouting()
}

function notFoundController(): void {
  appWrapper.innerHTML = headerController()
  appWrapper.innerHTML += '<div class="main-container"><h1>404 - Page Not Found</h1></div>';
  startRouting()
}

const routes: { [path: string]: ControllerFunction } = {
  '/': createControllerFunction(homeController),
  '/login': createControllerFunction(logInController),
  '/register': createControllerFunction(registerController),
  '/about': createControllerFunction(aboutController)
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
  window.removeEventListener('popstate', () => {});
  window.addEventListener('popstate', () => {
    handleRoute();
  });
}
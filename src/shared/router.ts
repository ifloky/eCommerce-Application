import { LoginPageController } from "../pages/loginPage/loginPageController";
import { MainPageController } from "../pages/mainPage/MainPageController";

type ControllerFunction = () => void;

function createControllerFunction(renderFunction: ControllerFunction): ControllerFunction {
  return renderFunction;
}

function homeController(): void {
  MainPageController()
}

function logInController(): void {
  LoginPageController()
}

function registerController(): void {
  const appDiv = document.body
  appDiv.innerHTML = '<h1>Register Page</h1><a href="/"> home </a>';
}

function aboutController(): void {
  const appDiv = document.body;
  appDiv.innerHTML = '<h1>About Page</h1><a href="/"> home </a>';
}

function notFoundController(): void {
  const appDiv = document.body
  appDiv.innerHTML = '<h1>404 - Page Not Found</h1><a href="/"> home </a>';

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

  let links = document.querySelectorAll('a'); 

  console.log(links);
  
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const href = link.getAttribute('href');
      if (href && href.startsWith('/')) {
        changeRoute(href);
      }
    });
  });

  window.addEventListener('popstate', () => {
    handleRoute();
  });

  window.addEventListener('hashchange', () => {
    links = document.querySelectorAll('a');
  });
}


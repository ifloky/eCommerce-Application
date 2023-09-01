import { getLoginPageView } from "../pages/loginPage/loginPageView";
import { MainPageController } from "../pages/mainPage/MainPageController";
import RegistrationPageView from "../pages/registrationPage/registrationView";
import { catalogRender } from "../pages/catalogPage/catalogPageView";


type ControllerFunction = () => void;

function createControllerFunction(renderFunction: ControllerFunction): ControllerFunction {
  return renderFunction;
}

function updateContainer(content: string): void {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.innerHTML = content;
  }
}

export async function homeController(): Promise<void> {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.innerHTML = ''
    appContainer.append(await MainPageController());
  }
}

function logInController(): void {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.innerHTML = ''
    appContainer.append(getLoginPageView);
  }
}


export function registerController(): void {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.innerHTML = ''
    appContainer.append(RegistrationPageView())
  }
}

function catalogController(): void {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.innerHTML = ''
    appContainer.append(catalogRender());
  }
}

function notFoundController(): void {
  updateContainer('<div class="main-container"><h1>404 - Page Not Found</h1></div>');
}

const routes: { [path: string]: ControllerFunction } = {
  '/': createControllerFunction(homeController),
  '/login': createControllerFunction(logInController),
  '/register': createControllerFunction(registerController),
  '/catalog': createControllerFunction(catalogController)
};

function handleRoute(): void {
  const currentPath = window.location.pathname;
  const controller = routes[currentPath] || notFoundController;
  controller();
}

function popstateHandler(): void {
  handleRoute();
}

window.addEventListener('popstate', popstateHandler);

function changeRoute(path: string): void {
  const fullPath = `${window.location.origin}${path}`;
  window.history.pushState({}, '', fullPath);
  handleRoute();
}

export function startRouting(): void {
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

  handleRoute();

  window.addEventListener('beforeunload', () => {
    const currentState = {};
    localStorage.setItem('appState', JSON.stringify(currentState));
  });
}

startRouting();

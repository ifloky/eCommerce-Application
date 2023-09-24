import { getLoginPageView } from '../pages/loginPage/loginPageView';
import { MainPageController } from '../pages/mainPage/MainPageController';
import { getUserProfileView } from '../pages/userProfilePage/userProfilePageView';
import { ProductPage } from '../pages/productPage/productPageController';
import { aboutUsPageView } from '../pages/aboutUsPage/aboutUsPageView';
import { teamMembers } from '../pages/aboutUsPage/components/teamMembers';
import { basketPageView } from '../pages/basketPage/basketPageView';
import { getCatalogView } from '../pages/catalogPage/catalogPageView';
import { getRegistrationPageView } from '../pages/registrationPage/registrationPageView';

type ControllerFunction = () => void;

function createControllerFunction(renderFunction: ControllerFunction): ControllerFunction {
  return renderFunction;
}

export async function updateContainer(element: HTMLElement): Promise<void> {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.innerHTML = '';
    appContainer.append(element);
  }
}

export async function homePageRender(): Promise<void> {
  updateContainer(await MainPageController());
}

export function logInPageRender(): void {
  updateContainer(getLoginPageView);
}

export function registerPageRender(): void {
  updateContainer(getRegistrationPageView);
}

export function userProfilePageRender(): void {
  updateContainer(getUserProfileView);
}

export async function catalogPageRender(): Promise<void> {
  updateContainer(await getCatalogView());
}

function aboutUsPageRender(): void {
  updateContainer(aboutUsPageView(teamMembers));
}

export async function basketPageRender(): Promise<void> {
  updateContainer(await basketPageView());
}

export function productPageRender(): void {
  ProductPage.render();
}

function notFoundPageRender(): void {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.innerHTML = '';
    appContainer.innerHTML = '<div class="main-container"><h1>404 - Page Not Found</h1><a href="/"</div>';
  }
}

const routes: { [path: string]: ControllerFunction } = {
  '/': createControllerFunction(homePageRender),
  '/login': createControllerFunction(logInPageRender),
  '/register': createControllerFunction(registerPageRender),
  '/catalog': createControllerFunction(catalogPageRender),
  '/product': createControllerFunction(productPageRender),
  '/profile': createControllerFunction(userProfilePageRender),
  '/about': createControllerFunction(aboutUsPageRender),
  '/basket': createControllerFunction(basketPageRender),
};

function handleRoute(): void {
  const currentPath = window.location.pathname;
  const controller = routes[currentPath] || notFoundPageRender;
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
    if (!link.closest('.footer')) {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
          changeRoute(href);
        }
      });
    }
  });

  handleRoute();

  window.addEventListener('beforeunload', () => {
    const currentState = {};
    localStorage.setItem('appState', JSON.stringify(currentState));
  });
}

export function redirectToHomePage(): void {
  changeRoute('/');
}

export function redirectToRegisterPage(): void {
  changeRoute('/register');
}
export function redirectToLoginPage(): void {
  changeRoute('/login');
}

export function redirectToCatalog(): void {
  changeRoute('/catalog');
}

export function redirectToBasket(): void {
  changeRoute('/basket');
}

startRouting();

import { getLoginPageView } from "../pages/loginPage/loginPageView";
import { MainPageController } from "../pages/mainPage/MainPageController";
import RegistrationPageView from "../pages/registrationPage/registrationView";
import { getUserProfileView } from "../pages/userProfilePage/userProfilePageView";
import {  catalogRender,
          createTomatoCorn,
          createOtherSeeds,
          createAllProducts } from "../pages/catalogPage/catalogPageView";
import { ProductPage } from "../pages/productPage/productPageController";
import { aboutUsPageView } from "../pages/aboutUsPage/aboutUsPageView";
import { teamMembers } from "../pages/aboutUsPage/components/teamMembers";
import { busketPageView } from "../pages/busketPage/busketPageView";

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

export function logInController(): void {
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

export function userProfilePageController(): void {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.innerHTML = ''
    appContainer.append(getUserProfileView)
  }
}

export async function catalogController(): Promise<void> {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.innerHTML = ''
    appContainer.append(catalogRender());
    appContainer.append(await createAllProducts());
  }
}

async function tomatoCornController(): Promise<void> {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.innerHTML = ''
    appContainer.append(await createTomatoCorn());
  }
}

async function otherSeedsController(): Promise<void> {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.innerHTML = ''
    appContainer.append(await createOtherSeeds());
  }
}

function aboutUsController(): void {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.innerHTML = ''
    appContainer.append(aboutUsPageView(teamMembers));
  }
}

async function busketButtonController(): Promise<void> {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.innerHTML = ''
    appContainer.append(await busketPageView());
  }
}

export function productController(): void {
  ProductPage.render()
}

function notFoundController(): void {
  updateContainer('<div class="main-container"><h1>404 - Page Not Found</h1></div>');
}

const routes: { [path: string]: ControllerFunction } = {
  '/': createControllerFunction(homeController),
  '/login': createControllerFunction(logInController),
  '/register': createControllerFunction(registerController),
  '/catalog': createControllerFunction(catalogController),
  '/tomato': createControllerFunction(tomatoCornController),
  '/otherSeeds': createControllerFunction(otherSeedsController),
  '/product': createControllerFunction(productController),
  '/profile': createControllerFunction(userProfilePageController),
  '/about': createControllerFunction(aboutUsController),
  '/busket': createControllerFunction(busketButtonController),
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

export function redirectToHomePage(): void {
  changeRoute('/');
}

export function redirectToRegisterPage(): void {
  changeRoute('/register');
}
export function redirectToLoginPage(): void {
  changeRoute('/login');
}


startRouting();

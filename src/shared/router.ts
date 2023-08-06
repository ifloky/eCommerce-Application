// routing.ts

type ControllerFunction = () => void;

function createControllerFunction(renderFunction: ControllerFunction): ControllerFunction {
  return renderFunction;
}

function homeController(): void {
  const appDiv = document.body
  appDiv.innerHTML = '<h1>Home Page</h1>';
}

function logInController(): void {
  const appDiv = document.body;
  appDiv.innerHTML = '<h1>LogIn Page</h1>';
}

function registerController(): void {
  const appDiv = document.body
  appDiv.innerHTML = '<h1>Register Page</h1>';
}

function notFoundController(): void {
  const appDiv = document.body
  appDiv.innerHTML = '<h1>404 - Page Not Found</h1>';
}

const routes: { [path: string]: ControllerFunction } = {
  '/': createControllerFunction(homeController),
  '/login': createControllerFunction(logInController),
  '/register': createControllerFunction(registerController),
};

function handleRoute(): void {
  const currentPath = window.location.pathname;
  const controller = routes[currentPath] || notFoundController; // Используем notFoundController для несуществующих маршрутов
  controller();
}

export function startRouting(): void {
  function changeRoute(path: string): void {
    window.history.pushState({}, '', path);
    handleRoute();
  }

  const links = document.querySelectorAll('a[href]');
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const href = link.getAttribute('href');
      if (href) {
        changeRoute(href);
      }
    });
  });

  window.addEventListener('popstate', handleRoute);
  handleRoute();
}

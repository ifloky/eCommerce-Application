import '../../assets/styles/header.scss';
import { headerView } from './headerView';

const headerLinks = {
  logoImage: './src/assets/image/logo.png',
  cart: '/cart',
  signIn: '/login',
  signUp: '/register',
}

function createHeader(): void {
  const headerWrapper = document.createElement("div");
  headerWrapper.className = 'header__wrapper';
  headerWrapper.innerHTML = headerView(headerLinks);

  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.appendChild(headerWrapper);
  }
}

const Header = {
  render: createHeader
};

export default Header;


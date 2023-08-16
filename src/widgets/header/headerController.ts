import { headerView } from './headerView';

const headerLinks = {
  logoImage: './src/assets/image/logo.png',
  cart: '/cart',
  signIn: '/login',
  signUp: '/register',
}

function createHeader(): void {
  const [headerContainer] = document.getElementsByClassName('header__wrapper');
  if (headerContainer) {

    headerContainer.innerHTML = headerView(headerLinks);
  }
}

const Header = {
  render: createHeader
};

export default Header;
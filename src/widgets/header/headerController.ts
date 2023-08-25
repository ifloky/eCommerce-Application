import { headerView } from './headerView';
import { Links } from '../../types/interfaces/Header'

const headerLinks: Links = {
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
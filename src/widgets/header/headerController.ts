import '../../assets/css/header/header.scss'
import { headerView } from './headerView';
import { startRouting } from '../../shared/router';

const navElements = [
  '<a href="/" class= "header__nav-link"><li class="header__nav-link-element"> Main </li> </a>',
  '<a href="/about" class= "header__nav-link"><li class="header__nav-link-element"> about </li> </a>',
  '<a href="/catalog" class= "header__nav-link"><li class="header__nav-link-element"> catalog </li> </a>',
  '<a href="/404" class= "header__nav-link"><li class="header__nav-link-element"> 404 </li> </a>',
];

const links = {
  logoImage: './src/assets/image/logo.png',
  cart: '/cart',
  signIn: '/login',
  signUp: '/register',
}

export function headerController(): string {
  document.body.innerHTML = headerView(navElements, links);
  startRouting()
  return headerView(navElements, links);
}

import { deleteCookie } from "../../shared/API";
import { startRouting } from "../../shared/router";
import { Links } from "../../types/interfaces/Header";
import { createElement } from "../../utils/abstract";
import Navigation from "../Navigation/navigationController";

const headerLinks: Links = {
  logoImage: './src/assets/image/logo.png',
  cart: '/cart',
  signIn: '/login',
  signUp: '/register',
}

const headerWrapper = createElement('div', ['header__wrapper']);

export function headerView(links: Links, signIn: boolean): string {
  return `
  <div class="header">
    <div class="header__logo">
      <a href="/" class="header__logo"> </a>
    </div>
    <div class="navigation__wrapper">
      ${Navigation.render()}
    </div>
    <a href=${links.cart} class="header__cart-btn btn-light">Cart</a>
    ${signIn ? `<div class="header__user-wrapper">
          <a href=${links.profile} class="header__btn btn">Profile</a>
          <button id="signOut" class="header__btn btn">Sign Out</button>
        </div>`
      : `
        <div class="header__user-wrapper">
          <a href=${links.signIn} class="header__btn btn">Sign In</a>
          <a href=${links.signUp} class="header__btn btn">Sign Up</a>
        </div>`
    }
  </div>
  `;
}

function createHeader(signIn: boolean): void {
  headerWrapper.innerHTML = headerView(headerLinks, signIn);
  document.body.append(headerWrapper)
  startRouting();
}

function refreshHeader(signIn: boolean): void {
  headerWrapper.innerHTML = headerView(headerLinks, signIn);
  startRouting();
}

const Header = {
  render: createHeader,
  refresh: refreshHeader
};

function signOut(event:Event):void {
  if ((event.target as HTMLElement).id === 'signOut') {
    deleteCookie('access_token');
    Header.refresh(false);
  }
}

headerWrapper.addEventListener('click', (e) => {
  signOut(e)
})


export default Header;
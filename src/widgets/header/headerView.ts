import '../../assets/styles/layout/header/header.scss';
import { Links } from "../../types/interfaces/Header";
import Navigation from "../Navigation/navigationController";

export function headerView(links: Links): string {
  return `
  <div class="header">
    <div class="header__logo">
      <a href="/" class="header__logo"> </a>
    </div>
    <div class="navigation__wrapper">
      ${Navigation.render()}
    </div>
    <a href=${links.cart} class="header__cart-btn btn-light">Cart</a>
    <div class="header__user-wrapper">
      <a href=${links.signIn} class="header__btn btn">Sign In</a>
      <a href=${links.signUp} class="header__btn btn">Sign Up</a>
    </div>
  </div>
  `;

}
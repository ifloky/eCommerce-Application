import { Links } from "../../types/interfaces/Header";
import Navigation from "../Navigation/navigationController";

export function headerView(links: Links): string {
  return `
  <div class="header">
    <a href="/" class="header__logo">
      <img src=${links.logoImage} alt="" class="header__logo-img">
    </a>
    <div class="navigation__wrapper">
      ${Navigation.render()}
    </div>
    <div class="cart">
      <a href=${links.cart} class="header__card-btn btn-light">Cart</a>
    </div>
    <div class="header__user-wrapper">
      <a href=${links.signIn} class="header__btn btn">Sign In</a>
      <a href=${links.signUp} class="header__btn btn">Sign Up</a>
    </div>
  </div>
  `;

}
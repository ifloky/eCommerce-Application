interface Links {
  [key: string]: string;
}

export function headerView(navElements: string[], links: Links): string {
  const navElementsHTML = navElements.join('');
  return `
  <div class="header">
    <a href="/" class="header__logo">
      <img src=${links.logoImage} alt="" class="header__logo-img">
    </a>
    <nav class="navigation">
      <ul class="header__nav-ul">
        ${navElementsHTML}
      </ul>
    </nav>
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
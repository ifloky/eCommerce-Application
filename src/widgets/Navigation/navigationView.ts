import { NavigationElement } from "../../types/interfaces/Navigation";

export function navigationView(navigationElements: NavigationElement[]): string {
  return `
    <nav class="navigation">
      <ul class="header__nav-ul">
        ${navigationElements.map((navigationElement) => {
          const navElementString = `<li class="header__nav-link-element"><a href="${navigationElement.link}" class="header__nav-link">${navigationElement.nameLink}</a></li>`;
          return navElementString;
        }).join('')} 
      </ul>
    </nav>
  `;
}
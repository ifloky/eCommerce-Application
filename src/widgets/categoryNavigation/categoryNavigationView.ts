import { createElement } from "../../utils/abstract";

export interface LinkObject {
  id: string;
  name: Record<string, string>; 
  parent: string;
}

export async function categoryNavigationView(linkList: LinkObject[]): Promise<HTMLElement> {
  const categoryNavigationWrapper = createElement('ul', ['category-navigation-wrapper']);
  
  categoryNavigationWrapper.innerHTML = linkList.map((el) => {
    return !el.parent ? `<li class="category-navigation__item">
      <a class="category-navigation__link" href="/${el.name['en-US']}">${el.name['en-US']}</a>
    </li>` : '';
  }).join('');

  return categoryNavigationWrapper;
}
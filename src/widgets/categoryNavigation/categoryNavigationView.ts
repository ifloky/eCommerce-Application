import { createElement } from "../../utils/abstract";

export interface CategoryObject {
  id: string;
  name: Record<string, string>; 
  parent: string;
}

export async function categoryNavigationView(categoryList: CategoryObject[]): Promise<HTMLElement> {
  const categoryNavigationWrapper = createElement('ul', ['category-navigation__wrapper']);
  
  categoryNavigationWrapper.innerHTML = categoryList.map((categoryItem) => {
    return !categoryItem.parent 
    ? `<li class="category-navigation__item">
        <a class="category-navigation__link" href="/${categoryItem.name['en-US']}">${categoryItem.name['en-US']}</a>
      </li>` 
    : '';
  }).join('');

  return categoryNavigationWrapper;
}
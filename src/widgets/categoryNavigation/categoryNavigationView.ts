import { CategoryObject } from "../../types/interfaces/widgets/CategoryNavigation";
import { createElement } from "../../utils/abstract";



export async function categoryNavigationView(categoryList: CategoryObject[]): Promise<HTMLElement> {
  const categoryNavigationWrapper = createElement('ul', ['category-navigation__wrapper']);
  
  categoryNavigationWrapper.innerHTML = categoryList.map((categoryItem) => {
    return !categoryItem.parent 
    ? `<li class="category-navigation__item">
        <a class="category-navigation__link" href="/${categoryItem.name['en-US']}" id="${categoryItem.id}">${categoryItem.name['en-US']}</a>
      </li>` 
    : '';
  }).join('');

  return categoryNavigationWrapper;
}
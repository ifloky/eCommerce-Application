import { Product } from "../../../types/interfaces/Product"
import { createElement } from "../../../utils/abstract"


function returnButtonPages(items: Product[]): string {
  const countPages = Math.ceil(items.length / 10);
  let buttonPages: string = ''
  if (countPages > 1) {
    for (let i = 1; i <= countPages; i += 1) {
      buttonPages += `<button class="button-light" id="${i}">${i}</button>`;
    }
  }
  return buttonPages;
}

export function paginationView(items: Product[]): HTMLElement {
  const paginationWrapper = createElement('div', ['pagination__wrapper']);

  try {
    const buttonPages = returnButtonPages(items);

    paginationWrapper.innerHTML = `<button class="button" id="buttonPrev">Prev</button>${buttonPages || '...'}<button class="button" id="buttonNext">Next</button>`;
  } catch (error) {
    throw Error("" + error);
  }

  return paginationWrapper;
}



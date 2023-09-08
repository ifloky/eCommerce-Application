import { productContainer } from '../../pages/productPage/productPageView';
import { createElement } from '../../utils/abstract';


export function createSliderElement(imageUrls: string[]): HTMLElement {
  const sliderContainer = createElement('div', ['slider__container']);
  const slider = createElement('div', ['slider__img']);
  const prevButton = createElement('button', ['slider__prev-button', 'slider__button']);
  prevButton.textContent = '<';
  const nextButton = createElement('button', ['slider__next-button', 'slider__button']);
  nextButton.textContent = '>';
  const dotWrapper = createElement('div', ['slider__dot-wrapper'])
  sliderContainer.appendChild(slider);
  sliderContainer.appendChild(prevButton);
  sliderContainer.appendChild(nextButton);
  sliderContainer.appendChild(dotWrapper);
  let currentIndex = 0;
  const imageLength = imageUrls.length;
  for (let index = 1; index <= imageLength; index += 1) {
    dotWrapper.innerHTML += `<div class="slider__dot"></div>`
  }
  function updateSlider(): void {
    const currentImageUrl = imageUrls[currentIndex];
    const dots = dotWrapper.querySelectorAll<HTMLElement>('.slider__dot');
    dots.forEach((dot) => {
      const dotStyle = dot.style;
      dotStyle.backgroundColor = '#fefefe';
    });
    dots[currentIndex].style.backgroundColor = '$color-primary';
    slider.style.backgroundImage = `url('${currentImageUrl}')`;
    slider.setAttribute('data-url', imageUrls[currentIndex])
  }
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    updateSlider();
  });
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    updateSlider();
  });
  updateSlider();
  return sliderContainer;
}


export function showModal(ev: MouseEvent, imageUrls: string[]): void {
  const target = ev.target as HTMLElement;
  if (!target) {
    return;
  }

  const modalContainer = createElement('div', ['modal__container']);
  const modalContent = createElement('div', ['modal__content']);
  const sliderContainer = createSliderElement(imageUrls);
  const closeButton = createElement('button', ['modal__close-button']);
  closeButton.innerHTML = 'X';
  modalContent.append(sliderContainer);
  modalContainer.append(closeButton, modalContent);
  productContainer.append(modalContainer);

  closeButton.addEventListener('click', () => {
    productContainer.removeChild(modalContainer);
  });
  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      productContainer.removeChild(modalContainer);
    }
  });
  document.body.style.overflow = 'hidden';
}


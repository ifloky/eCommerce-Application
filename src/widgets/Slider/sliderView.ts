import { createElement } from '../../utils/abstract';

export function createSliderElement(imageUrls: string[]): HTMLElement {
  const sliderContainer = createElement('div', ['slider__container']);
  const slider = createElement('div', ['slider__img']);
  const prevButton = createElement('button', ['slider__prev-button', 'slider__button']);
  prevButton.textContent = '<';
  const nextButton = createElement('button', ['slider__next-button', 'slider__button']);
  nextButton.textContent = '>';

  sliderContainer.appendChild(slider);
  sliderContainer.appendChild(prevButton);
  sliderContainer.appendChild(nextButton);

  let currentIndex = 0;

  function updateSlider(): void {
    const currentImageUrl = imageUrls[currentIndex];
    slider.style.backgroundImage = `url('${currentImageUrl}')`;
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


export const createElement = <T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  cssClasses?: string[],
  innerHTML?: string,
): HTMLElementTagNameMap[T] => {
  const element = document.createElement(tagName);
  if (cssClasses) {
    cssClasses.map((cssClass) => element.classList.add(cssClass));
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  return element;
};

export function displayMessage(message: string, status: boolean): void {
  const messageElement = createElement('div', ['error', status ? 'positive' : 'negative']);
  messageElement.innerHTML = message;
  document.body.appendChild(messageElement);

  setTimeout(() => {
    document.body.removeChild(messageElement);
  }, 3000);
}

const createConfirm = (message: string): Promise<boolean> => {
  return new Promise((complete)=>{
    const confirmWrapper = createElement('div', ['confirm-wrapper'], message);
    const buttonYes = createElement('button', ['button-light','confirm-wrapper__button-yes'], "YES");
    const buttonNo = createElement('button', ['button-light','confirm-wrapper__button-no'], "NO");
    confirmWrapper.append(buttonYes,buttonNo)
    document.body.appendChild(confirmWrapper);
    
    buttonYes.addEventListener('click', () => {
      complete(true);
      confirmWrapper.remove();
    })
    
    buttonNo.addEventListener('click', () => {
      complete(false)
      confirmWrapper.remove();
    })
  });
}
                     
export const confirmPopUp = {
  confirm: async (message: string):Promise<boolean> => createConfirm(message)
}
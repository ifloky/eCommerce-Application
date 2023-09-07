export async function busketPageView(): Promise<HTMLElement> {
  const message = document.createElement('div');
  message.innerHTML = `Start to make busket`;
  return message;
}
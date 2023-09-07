export async function basketPageView(): Promise<HTMLElement> {
  const message = document.createElement('div');
  message.innerHTML = `Start to make basket`;
  return message;
}
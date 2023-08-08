
const links: string[] = ['/catalog', '/about', '/basket']

function headerLogo(): HTMLElement {
  const headerLogoElement = document.createElement('a');
  headerLogoElement.href = `/`;
  headerLogoElement.className = 'header__logo'
  const headerLogoImage = document.createElement('img');
  headerLogoImage.src = '../../src/assets/image/logo.png';
  headerLogoImage.className = 'header__logo'
  headerLogoElement.append(headerLogoImage)
  return headerLogoElement
}

function headerMenu(linksArray:string[]): HTMLElement {
  const headerNavElement = document.createElement('nav');
  headerNavElement.className = 'header__nav'
  const headerNavList = document.createElement('ul');
  headerNavList.className = 'header__nav-ul'
  linksArray.map((el) => {
    const headerNavListLink = document.createElement('a');
    headerNavListLink.href = el;
    headerNavListLink.className = 'header__nav-link' 
    const headerNavListElement = document.createElement('li');
    headerNavListElement.className = 'header__nav-li';
    headerNavListElement.innerText = el.slice(1, el.length)
    headerNavListLink.append(headerNavListElement);
    headerNavList.append(headerNavListLink);
    return headerNavList
  })
  headerNavElement.append(headerNavList)
  return headerNavElement
}

function headerUser(): HTMLElement {
  const headerUserWrapper = document.createElement('div');
  headerUserWrapper.className = 'header__user-wrapper'
  const headerLoginButton = document.createElement('a');
  headerLoginButton.href = `/login`;
  headerLoginButton.innerText = 'Sign In'
  headerLoginButton.className = 'header__user-login'
  const headerRegistrationButton = document.createElement('a');
  headerRegistrationButton.href = `/registration`;
  headerRegistrationButton.innerText = 'Sign Up'
  headerRegistrationButton.className = 'header__user-registration'
  headerUserWrapper.append(headerLoginButton, headerRegistrationButton)
  return headerUserWrapper
}


export function mainPageView(): void { 
  document.body.append(headerLogo(), headerMenu(links), headerUser());
}
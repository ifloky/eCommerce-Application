

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

function headerUser(): HTMLElement {
  const headerUserWrapper = document.createElement('div');
  headerUserWrapper.className = 'header__user-wrapper'
  const headerLoginButton = document.createElement('a');
  headerLoginButton.href = `/`;
  headerLoginButton.innerText = 'home'
  headerLoginButton.className = 'header__user-login'
  const headerRegistrationButton = document.createElement('a');
  headerRegistrationButton.href = `/registration`;
  headerRegistrationButton.innerText = 'Sign Up'
  headerRegistrationButton.className = 'header__user-registration'
  headerUserWrapper.append(headerLoginButton, headerRegistrationButton)
  return headerUserWrapper
}


export function LoginPageView(): void { 
  document.body.append(headerLogo(), headerUser());
}
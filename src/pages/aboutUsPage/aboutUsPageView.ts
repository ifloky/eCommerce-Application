import { TeamMember } from '../../types/interfaces/teamMemberInfo';
import { createElement } from '../../utils/abstract';

function returnTemplateOneMember(elem: TeamMember): string {
  const template = `
  <div class="person__image-wrapper">
    <img src="${elem.imgUrl}" class="person__image" alt="personal-image">
  </div>
  <ul class="person__list">
  ${elem.lead ? `<li style="list-style:none; font-weight: 900">Team lead </li>` : ''}
  <li>Name: ${elem.name}</li>
  <li>Age: ${elem.age} years</li>
  <li>About: ${elem.about}</li>
  <li>GitHub: <a href="${elem.github}">${elem.github}</a></li>
  <li>Personal contribution: ${elem.contribution}</li>
  </ul>`;
  return template;
}

function createOneMember(elem: TeamMember): HTMLElement {
  const oneMemberProfileWrapper = createElement('div', ['item__wrapper']);
  oneMemberProfileWrapper.innerHTML = returnTemplateOneMember(elem);
  return oneMemberProfileWrapper;
}

function returnFooterIconElement(): HTMLElement {
  const footerIcon = createElement('div', ['footer__icon']);
  footerIcon.innerHTML = `
  <div class="footer__logo">
  <a href="https://rs.school/" class="footer__logo-link"> </a>
  </div>`;
  return footerIcon;
}

export function aboutUsPageView(info: TeamMember[]): HTMLElement {
  const aboutUsWrapper = createElement('div', ['about__wrapper']);
  aboutUsWrapper.innerHTML = `<h2 class="about__title">Our Dream Team</h2>`;
  for (let i = 0; i < info.length; i += 1) {
    const onePerson = createOneMember(info[i]);
    aboutUsWrapper.append(onePerson);
  }
  aboutUsWrapper.append(returnFooterIconElement());
  return aboutUsWrapper;
}

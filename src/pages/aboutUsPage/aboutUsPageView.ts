import { TeamMember } from "../../types/interfaces/teamMemberInfo";

function createOneMember(elem: TeamMember): HTMLElement {
  const oneMemberProfileWrapper = document.createElement('div');
  oneMemberProfileWrapper.classList.add('item_wrapper');
  oneMemberProfileWrapper.innerHTML = `
  <div class="person_image ${elem.class}"></div>
  <ul class="person_list">
  <li>Name: ${elem.name}</li>
  <li>Age: ${elem.age} years</li>
  <li>About: ${elem.about}</li>
  <li>GitHub: <a href="${elem.github}">${elem.github}</a></li>
  </ul>`;
  return oneMemberProfileWrapper;
}

export function aboutUsPageView(info: TeamMember[]): HTMLElement {
  const aboutUsWrapper = document.createElement('div');
  aboutUsWrapper.classList.add('about_wrapper');
  aboutUsWrapper.innerHTML = `<h2 class="about_title">Our Dream Team</h2>`;
  for (let i = 0; i < info.length; i +=1) {
    const onePerson = createOneMember(info[i]);
    aboutUsWrapper.append(onePerson);
  }
  const footerIcon = document.createElement('div');
  footerIcon.innerHTML = `
  <div class="footer__logo">
  <a href="https://rs.school/" class="footer__logo-link"> </a>
  </div>`;
  aboutUsWrapper.append(footerIcon);
  return aboutUsWrapper;
}

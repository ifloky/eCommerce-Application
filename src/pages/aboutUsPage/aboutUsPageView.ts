import { TeamMember } from '../../types/interfaces/teamMemberInfo';

function createOneMember(elem: TeamMember): HTMLElement {
  const oneMemberProfileWrapper = document.createElement('div');
  oneMemberProfileWrapper.classList.add('item__wrapper');
  oneMemberProfileWrapper.innerHTML = `
  <div class="person__image-wrapper">
    <img src="${elem.imgUrl}" class="person__image" alt="personal-image">
  </div>
  <ul class="person__list">
  ${elem.lead ? `<li style="list-style:none; font-weight: 900">Team lead </li>` : ''}
  <li>Name: ${elem.name}</li>
  <li>Age: ${elem.age} years</li>
  <li>About: ${elem.about}</li>
  <li>GitHub: <a href="${elem.github}">${elem.github}</a></li>
  </ul>`;
  return oneMemberProfileWrapper;
}

export function aboutUsPageView(info: TeamMember[]): HTMLElement {
  const aboutUsWrapper = document.createElement('div');
  aboutUsWrapper.classList.add('about__wrapper');
  aboutUsWrapper.innerHTML = `<h2 class="about__title">Our Dream Team</h2>`;
  for (let i = 0; i < info.length; i += 1) {
    const onePerson = createOneMember(info[i]);
    aboutUsWrapper.append(onePerson);
  }
  return aboutUsWrapper;
}

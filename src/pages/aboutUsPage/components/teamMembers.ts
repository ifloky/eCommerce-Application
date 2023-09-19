import { TeamMember } from '../../../types/interfaces/teamMemberInfo';
import maxImage from '../../../assets/image/aboutUsPhotos/max.jpg';
import kirillImage from '../../../assets/image/aboutUsPhotos/kirill.jpg';
import viktarImage from '../../../assets/image/aboutUsPhotos/vic.jpg';

export const teamMembers: TeamMember[] = [
  {
    lead: true,
    name: 'Maxim Petrenko',
    age: 28,
    about: `Master of Science in Engineering, specializing in Metallurgy. Graduated from high school in 2012 and enrolled at GSTU named after P.O. Sukhoy. Completed my master's degree at GSTU named after P.O. Sukhoy in 2019. Worked as a process engineer and a laboratory engineer at JSC "BSW" since 2017. In 2021, I joined LLC "Chislo udachi" as a webmaster.`,
    github: 'https://github.com/ifloky',
    imgUrl: maxImage,
  },
  {
    name: 'Kirill',
    age: 34,
    about:
      'I graduated from high school in 2006, in 2014 I graduated from Mogilev State University with a degree in jurisprudence. At the moment I am finishing my studies on the JavaScript frontend course at the Rolling Scope School. Amat victoria curam(Gaius Valerius Catullus)',
    github: 'https://github.com/panakir',
    imgUrl: kirillImage,
  },
  {
    name: 'Viktar',
    age: 43,
    about:
      "Im graduated from Belarus State Economic Unversity in 2005. My specilization is state and municipal management. Since 2006 I'm working at LLC Tabak-invest as a chief of fashion retail department. I'm married and have 2 children.",
    github: 'https://github.com/viktarbrutsis',
    imgUrl: viktarImage,
  },
];

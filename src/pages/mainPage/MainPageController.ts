import { startRouting } from '../../shared/router';
import { headerController } from '../../widgets/header/headerController';
import { mainPageView } from './mainPageView';

export function MainPageController(): void {
  mainPageView("Title", "Description");
  document.body.innerHTML = headerController()
  document.body.innerHTML += mainPageView("Title", "Description");
  startRouting()
}


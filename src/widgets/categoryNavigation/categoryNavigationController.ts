import { getAnonymousFlow } from "../../shared/API";
import { CategoryApiResponse, CategoryObject } from "../../types/interfaces/widgets/CategoryNavigation";
import { categoryNavigationView } from "./categoryNavigationView";



export async function categoryNavigationController(): Promise<HTMLElement> {
  try {
    const categoryListResponse: CategoryApiResponse = await getAnonymousFlow('/categories') ;
    const categoryListResults: CategoryObject[] = categoryListResponse.results;
    return categoryNavigationView(categoryListResults);
  } catch (error) {
    throw new Error(`Error in MainPageController: ${error}`);
  }
}

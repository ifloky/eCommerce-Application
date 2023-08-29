import { get } from "../../shared/API";
import { LinkObject, categoryNavigationView } from "./categoryNavigationView";

interface CategoryApiResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: LinkObject[];
}

export async function categoryNavigationController(): Promise<HTMLElement> {
  try {
    const categoryListResponse: CategoryApiResponse = await get('/categories') ;
    const categoryListResults: LinkObject[] = categoryListResponse.results;
    return categoryNavigationView(categoryListResults);
  } catch (error) {
    throw new Error(`Error in MainPageController: ${error}`);
  }
}

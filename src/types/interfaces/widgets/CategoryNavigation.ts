export interface CategoryObject {
  id: string;
  name: Record<string, string>;
  parent: string;
}

export interface CategoryApiResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: CategoryObject[];
}

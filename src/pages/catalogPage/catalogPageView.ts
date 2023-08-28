import { fetchBearerToken, DEVELOP_ID, DEVELOP_SECRET } from "../../shared/API";

export function catalogRender(): void {
   // eslint-disable-next-line no-console
   fetchBearerToken(DEVELOP_ID, DEVELOP_SECRET);
   fetch('https://api.us-central1.gcp.commercetools.com/bestshop-rs/products/')
// eslint-disable-next-line no-console
.then(response => response.json())
// eslint-disable-next-line no-console
.then(json => console.log(json));
}
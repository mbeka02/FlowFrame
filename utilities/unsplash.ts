import { createApi } from "unsplash-js";
//TODO : Apply for production to increase request limits from 50 per hour to 5000.
export const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
  fetch: fetch,
});

import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4002/graphql', token: '2e6364a9c3fc8ab19ffc5dd9790f207fa1d91a76', queries,  });
export default client;
  
## Create RTK

```js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Pokemon } from "./types";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getCustomersWithPagination: builder.query({
      query: ({ params }) => {
        return {
          url: CUSTOMER_API_URL,
          method: "GET",
          params,
        };
      },
      transformResponse: (response: { data: Post }, meta, arg) => response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
      providesTags: ["getCustomers"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi;
```

## use the hook in component

```js
import * as React from "react";
import { useGetPokemonByNameQuery } from "./services/pokemon";

export default function App() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  // render UI based on data and loading state
}
```

## Store

```js
import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "./services/pokemon";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
```

---

**skip** - Allows a query to 'skip' running for that render. Defaults to false<br><br>
**pollingInterval** - Allows a query to automatically refetch on a provided interval, specified in milliseconds. Defaults to 0 (off)
<br><br>
**selectFromResult** - Allows altering the returned value of the hook to obtain a subset of the result, render-optimized for the returned subset.
<br><br>
**refetchOnMountOrArgChange** - Allows forcing the query to always refetch on mount (when true is provided). Allows forcing the query to refetch if enough time (in seconds) has passed since the last query for the same cache (when a number is provided). Defaults to false
<br><br>
**refetchOnFocus** - Allows forcing the query to refetch when the browser window regains focus. Defaults to false
<br><br>
**refetchOnReconnect** - Allows forcing the query to refetch when regaining a network connection. Defaults to false

---

**data** - The latest returned result regardless of hook arg, if present.
currentData - The latest returned result for the current hook arg, if present.<br><br>
**error** - The error result if present.<br><br>
**isUninitialized** - When true, indicates that the query has not started yet.<br><br>
**isLoading** - When true, indicates that the query is currently loading for the first time, and has no data yet. This will be true for the first request fired off, but not for subsequent requests.<br><br>
**isFetching** - When true, indicates that the query is currently fetching, but might have data from an earlier request. This will be true for both the first request fired off, as well as subsequent requests.<br><br>
**isSuccess** - When true, indicates that the query has data from a successful request.<br><br>
**isError** - When true, indicates that the query is in an error state.<br><br>
**refetch** - A function to force refetch the query<br><br>

import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { SearchBar } from "../components/searchbar/searchbar";
export default component$(() => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Dogos searcher</title>
      </head>
      <body class="background-gradient">
        <main class="flex">
          <div class="container mx-auto my-6 ">
            <h1 class="text-white text-3xl text-center font-bold">
              Hey I am a dogo image searcher 🦮
            </h1>
            <div class="container my-12 ">
              <SearchBar />
            </div>
          </div>
        </main>
      </body>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

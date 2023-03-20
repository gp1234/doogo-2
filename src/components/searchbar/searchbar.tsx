import {
  component$,
  useSignal,
  Resource,
  useResource$,
} from "@builder.io/qwik";

export const SearchBar = component$(() => {
  const name = useSignal<string>("");

  const nameResource = useResource$(async ({ track, cleanup }) => {
    track(() => name.value);
    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));
    const res = await fetch(
      `https://dog.ceo/api/breed/${name.value.toLocaleLowerCase()}/images`
    );
    const json = await res.json();
    return Array.isArray(json.message)
      ? json.message.map((url: string) => url)
      : Promise.reject(json);
  });

  return (
    <div class="flex flex-col max-w-xl	 mx-auto ">
      <div class="flex flex-col my-2">
        <label class="text-white font-bold my-1" for="searcher">
          Search for doggos images
        </label>
        <input
          class="my-2 rounded-lg py-2 px-4"
          type="text"
          value={name.value}
          onInput$={(ev) =>
            (name.value = (ev.target as HTMLInputElement).value)
          }
        />
      </div>

      <Resource
        value={nameResource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>No doggo found</div>}
        onResolved={(data: []) => (
          <div class="grid grid-cols-4 gap-4">
            {data.map((url) => {
              return (
                <div>
                  <img class="h-full rounded-lg max-w-full" src={url} />
                </div>
              );
            })}
          </div>
        )}
      />
    </div>
  );
});

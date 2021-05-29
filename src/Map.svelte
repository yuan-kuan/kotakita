<script>
  import { onMount } from 'svelte';
  import { Link } from 'svelte-navigator';
  import { isAdmin } from './user_store';

  const toParamCase = (str) => {
    if (!str) return '';

    str = str.toLowerCase();
    str = str.replace(/[ ]/g, '-');
    return str;
  };

  let isShowingAddPlace = false;
  let slug;
  let name;
  $: {
    slug = toParamCase(name);
  }

  const addNewPlace = async () => {
    isShowingAddPlace = false;

    if (name == 'p') return prefill();

    try {
      let respond = await fetch('/place', {
        method: 'POST',
        // credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, slug }),
      });

      if (respond.ok) {
        slug = '';
        name = '';
        getAllPlaces();
      } else {
        console.error(respond);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePlace = async (id) => {
    try {
      let respond = await fetch('/place/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (respond.ok) {
        console.log('respond :>> ', respond);
        getAllPlaces();
      } else {
        console.error(respond);
      }
    } catch (error) {
      console.error(error);
    }
  };

  let places = [];
  const getAllPlaces = async () => {
    try {
      let respond = await fetch('/all-places');

      if (respond.ok) {
        console.log('respond :>> ', respond);
        places = await respond.json();
        console.log('data :>> ', places);
      } else {
        console.error(respond);
      }
    } catch (error) {
      console.error(error);
    }
  };

  onMount(() => getAllPlaces());

  const prefill = async () => {
    try {
      let respond = await fetch('/prefill', {
        method: 'POST',
      });

      if (respond.ok) {
        console.log('respond :>> ', respond);
        getAllPlaces();
      } else {
        console.error(respond);
      }
    } catch (error) {
      console.error(error);
    }
  };
</script>

<section class="section has-background-primary ">
  <p class="title has-text-white">Check-points</p>
</section>

{#if $isAdmin}
  <button
    class="mt-2 button is-warning is-fullwidth"
    on:click={() => (isShowingAddPlace = true)}>Add</button
  >
{/if}

<div class="p-4">
  <ul>
    {#each places as place}
      <li>
        <Link to={`${place.key}`}>
          <div
            class="box my-2 is-flex is-align-items-center"
            style="position:relative;"
          >
            <figure class="image is-32x32 is-rounded">
              <img src="/_static/favicon.png" alt="" />
            </figure>
            <span class="pl-2">
              {place.name}
            </span>
            {#if $isAdmin}
              <div style="position:absolute; bottom:0; right:0;">
                <span class="has-text-warning"> url:</span>
                <span>{place.key}</span>
              </div>
              <button
                class="button is-warning is-rounded is-small"
                style="position:absolute; top:0; right:0;"
                on:click|stopPropagation|preventDefault|capture={deletePlace(
                  place.key
                )}>X</button
              >
            {/if}
          </div>
        </Link>
      </li>
    {/each}
  </ul>
  <br />
</div>

<div class="modal" class:is-active={isShowingAddPlace}>
  <div class="modal-background" on:click={() => (isShowingAddPlace = false)} />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Adding new place</p>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">Name</label>
        <input class="input" bind:value={name} />
      </div>
      <div class="field">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">Url</label>
        <input class="input" bind:value={slug} />
        <p class="help">
          Use lowercase and '-' only. Keep it short and sweet. As short as
          possible. e.g. 'gaya' for 'Gaya Street', 'park' for 'City Park'.
        </p>
        <p class="help">
          IMPORTANT: <strong>DO NOT DUPLICATE WITH OTHERS URL</strong>
        </p>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" on:click={addNewPlace}>Add</button>
    </footer>
  </div>
  <button
    class="modal-close is-large"
    aria-label="close"
    on:click={() => (isShowingAddPlace = false)}
  />
</div>

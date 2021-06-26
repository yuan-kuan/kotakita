<script>
  import { Link } from 'svelte-navigator';

  import { isAdmin } from './user_store';
  import { allPlaces } from './place_store';
  import * as place_store from './place_store';

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

    if (name == 'p') return place_store.prefill();

    await place_store.addNewPlace(name, slug, latlong);

    slug = '';
    name = '';
  };

  let isShowingEditPlace = false;
  let editingPlaceId;
  let order;
  let latlong;

  const startEditPlace = (editingPlace) => {
    editingPlaceId = editingPlace.key;
    order = editingPlace.order + 1;
    slug = editingPlace.key;
    name = editingPlace.name;
    latlong = editingPlace.lat
      ? `${editingPlace.lat}, ${editingPlace.long}`
      : '';
    isShowingEditPlace = true;
  };

  const changeLatlong = async () => {
    await place_store.changeLatlong(editingPlaceId, latlong);
    isShowingEditPlace = false;
  };

  // const changeOrder = async () => {
  //   if (order < 1 || order > $allPlaces.length) {
  //     console.error(`order ${order} is out of range`);
  //     isShowingEditPlace = false;
  //     return;
  //   }

  //   await place_store.changeOrder(editingPlaceId, order);
  //   isShowingEditPlace = false;
  // };

  // const changeSlug = async () => {
  //   // Do not allow Url change if slug is the same
  //   if (slug == editingPlaceId) {
  //     console.error(`url ${slug} has not changed.`);
  //     isShowingEditPlace = false;
  //     return;
  //   }

  //   await place_store.changeSlug(editingPlaceId, slug);
  //   isShowingEditPlace = false;
  // };

  // const deletePlace = async () => {
  //   isShowingEditPlace = false;
  //   place_store.deletePlace(editingPlaceId);
  // };
</script>

{#if $isAdmin}
  <button
    class="mt-2 button is-warning is-fullwidth"
    on:click={() => (isShowingAddPlace = true)}>Add</button
  >
{/if}

<div class="p-4">
  <ul>
    {#each $allPlaces as place}
      <li>
        <Link to={`${place.key}`}>
          <div
            class="box my-2 is-flex is-align-items-center"
            style="position:relative;"
          >
            <figure class="image is-32x32 is-rounded">
              <img src="/favicon.png" alt="" />
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
                on:click|stopPropagation|preventDefault|capture={() =>
                  startEditPlace(place)}
              >
                <span class="icon">
                  <i class="fa fa-edit" />
                </span>
              </button>
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
        <label class="label">Coordinate (lat, long)</label>
        <input class="input" bind:value={latlong} />
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

<div class="modal" class:is-active={isShowingEditPlace}>
  <div class="modal-background" on:click={() => (isShowingEditPlace = false)} />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Edit {name}</p>
    </header>
    <section class="modal-card-body">
      <div class="box field">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">Coordinate (lat, long)</label>
        <input class="input" bind:value={latlong} />
        <button class="button is-success" on:click={changeLatlong}
          >Change Lat Long</button
        >
      </div>
      <!-- 
      <div class="box field">
        <label class="label">Order</label>
        <input class="input" bind:value={order} />
        <button class="button is-success" on:click={changeOrder}
          >Change Order</button
        >
      </div>

      <div class="box field">
        <label class="label">Url</label>
        <input class="input" bind:value={slug} />
        <p class="help">
          Use lowercase and '-' only. Keep it short and sweet. As short as
          possible. e.g. 'gaya' for 'Gaya Street', 'park' for 'City Park'.
        </p>
        <p class="help">
          IMPORTANT: <strong>DO NOT DUPLICATE WITH OTHERS URL</strong>
        </p>
        <button class="button is-success" on:click={changeSlug}
          >Change URL</button
        >
      </div>

      <div class="box">
        <button class="button is-danger" on:click={deletePlace}
          >Delete this checkpoint</button
        >
      </div> 
-->
    </section>
  </div>
  <button
    class="modal-close is-large"
    aria-label="close"
    on:click={() => (isShowingEditPlace = false)}
  />
</div>

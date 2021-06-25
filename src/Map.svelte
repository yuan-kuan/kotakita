<script>
  import { onMount } from 'svelte';
  import { Link } from 'svelte-navigator';
  import { Loader } from '@googlemaps/js-api-loader';

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

    await place_store.addNewPlace(name, slug);

    slug = '';
    name = '';
  };

  let isShowingEditPlace = false;
  let editingPlaceId;
  let order;

  const startEditPlace = (editingPlace) => {
    editingPlaceId = editingPlace.key;
    order = editingPlace.order + 1;
    slug = editingPlace.key;
    name = editingPlace.name;
    isShowingEditPlace = true;
  };

  const changeOrder = async () => {
    if (order < 1 || order > $allPlaces.length) {
      console.error(`order ${order} is out of range`);
      isShowingEditPlace = false;
      return;
    }

    await place_store.changeOrder(editingPlaceId, order);
    isShowingEditPlace = false;
  };

  const changeSlug = async () => {
    // Do not allow Url change if slug is the same
    if (slug == editingPlaceId) {
      console.error(`url ${slug} has not changed.`);
      isShowingEditPlace = false;
      return;
    }

    await place_store.changeSlug(editingPlaceId, slug);
    isShowingEditPlace = false;
  };

  const deletePlace = async () => {
    isShowingEditPlace = false;
    place_store.deletePlace(editingPlaceId);
  };

  let mapDiv;
  const loader = new Loader({
    apiKey: 'AIzaSyCVOJFGHCb-6UaNvqQ7LvKMKxUbR_mIAP8',
    version: 'weekly',
    // libraries: ['places'],
  });

  const mapOptions = {
    center: {
      lat: 5.9846474,
      lng: 116.077384,
    },
    zoom: 16.5,
    mapId: 'bb6abb3bae6e3585',
    disableDefaultUI: true,
  };

  onMount(async () => {
    const google = await loader.load();
    const map = new google.maps.Map(mapDiv, mapOptions);

    // Create an info window to share between markers.
    const infoWindow = new google.maps.InfoWindow();

    const marker = new google.maps.Marker({
      position: { lat: 5.98230833933885, lng: 116.07628337297034 },
      map,
      title: 'Gaya The Stree',
    });

    marker.addListener('click', () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });
  });
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

<div class="block" style="height: 100vh;" bind:this={mapDiv} />
<!-- 
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
</div> -->

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

<div class="modal" class:is-active={isShowingEditPlace}>
  <div class="modal-background" on:click={() => (isShowingEditPlace = false)} />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Edit {name}</p>
    </header>
    <section class="modal-card-body">
      <div class="box field">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">Order</label>
        <input class="input" bind:value={order} />
        <p class="help">
          Use lowercase and '-' only. Keep it short and sweet. As short as
          possible. e.g. 'gaya' for 'Gaya Street', 'park' for 'City Park'.
        </p>
        <button class="button is-success" on:click={changeOrder}
          >Change Order</button
        >
      </div>

      <div class="box field">
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
        <button class="button is-success" on:click={changeSlug}
          >Change URL</button
        >
      </div>

      <div class="box">
        <button class="button is-danger" on:click={deletePlace}
          >Delete this checkpoint</button
        >
      </div>
    </section>
  </div>
  <button
    class="modal-close is-large"
    aria-label="close"
    on:click={() => (isShowingEditPlace = false)}
  />
</div>

<!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.082961531253!2d
116.07469971527458
!3d
5.9833145308657265
!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x323b698f86e4f1a7%3A0x7612284d8deb71d4!2sGaya%20Street%20Sunday%20Morning%20Market!5e0!3m2!1sen!2smy!4v1624608675132!5m2!1sen!2smy" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe> -->

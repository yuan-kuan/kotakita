<script>
  // import QRious from 'qrious';
  import { onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { isAdmin } from './user_store';
  import { visitingPlace, visitPlace } from './route_store';
  import EmbededMap from './Embeded_Map.svelte';
  import CheckIn from './CheckIn.svelte';

  export let placeId;
  export let navigate;

  $: {
    visitPlace(placeId);
  }
  $: name = $visitingPlace.name;
  $: description = $visitingPlace.description;
  $: photoUrl = $visitingPlace.photoUrl;
  $: mapUrl = $visitingPlace.mapUrl;

  onDestroy(() => {
    visitingPlace.set({});
  });

  const goBack = () => {
    navigate(-1);
  };

  let editing;
  $: showingEdit = editing;
  $: showingPendingEdit = editing == 'photoUrl';
  let working = '';
  const startEdit = (attributeName) => {
    working = $visitingPlace[attributeName];
    editing = attributeName;
  };
  const closeEdit = () => {
    working = '';
    editing = null;
  };
  const editDescription = async () => {
    try {
      const n = {};

      if (editing == 'mapUrl') {
        const validUrl = working.match(/src="([^"]*)"/);
        if (validUrl) working = validUrl[1];
        else if (!working.match(/^https:\/\/www.google.com\/maps\/embed/)) {
          console.error('Bad Google Map URL or embed URL. ', working);
          return;
        }
      }

      n[editing] = working;
      let respond = await fetch('/place/' + placeId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(n),
      });

      if (respond.ok) {
        closeEdit();
        visitPlace(placeId);
      } else {
        console.error(respond);
      }
    } catch (error) {
      console.error(error);
    }
  };

  let cameraInput;
  const changePhoto = () => cameraInput.click();
  const photoTaken = async (e) => {
    // Open up the edit modal
    editing = 'photoUrl';

    const blob = e.target.files[0];
    const formData = new FormData();
    formData.append('image', blob);

    // const expiration = 60000;
    const expiration = 0;
    const key = '54e0a6c82adf9b36d8df784a3a88d7c9';
    let imgbbUploadUrl = `https://api.imgbb.com/1/upload?key=${key}`;
    if (expiration > 0) {
      imgbbUploadUrl += `&expiration=${expiration}`;
    }

    try {
      const respond = await fetch(imgbbUploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (respond.ok) {
        const imgbbResult = await respond.json();
        const mediumUrl = imgbbResult.data.medium.url;

        working = mediumUrl;
        editDescription();
      } else {
        throw `Failed uploading, respond: ${JSON.stringify(respond)}`;
      }
    } catch (error) {
      console.error(error);
    }
  };

  let showingQr = false;
  let qrCanvas;
  // const createQR = () => {
  //   const data = window.location.toString();
  //   new QRious({ element: qrCanvas, value: data, size: 300 });

  //   showingQr = true;
  // };
  const closeQR = () => {
    showingQr = false;
  };
</script>

<input
  style="display: none"
  bind:this={cameraInput}
  type="file"
  accept="image/*"
  on:change={photoTaken}
/>
{#if $isAdmin}
  <button class="button image-edit is-warning" on:click={changePhoto}>
    <span class="icon">
      <i class="fa fa-edit" />
    </span>
  </button>
{/if}
<button
  class="button is-primary is-inverted is-outlined image-back is-large"
  on:click={goBack}
>
  <span class="icon">
    <i class="fa fa-arrow-left" />
  </span>
</button>
<figure class="image is-1by1 has-background-info" style="z-index: -1;">
  {#if photoUrl}
    <img
      in:fade
      src={photoUrl}
      alt="The photo of {name}"
      style="object-fit: cover;"
    />
  {/if}
</figure>

<CheckIn />

<div
  class="box px-5 has-background-primary has-text-white"
  style="border-radius: 15px;"
>
  <div>
    {#if name}
      <span in:fade class="is-size-3" style="line-height:1em;">{name}</span>
      {#if $isAdmin}
        <button class="button is-warning" on:click={() => startEdit('name')}>
          Edit Name
        </button>
        <!-- <button class="button is-small" on:click={createQR}>QR</button> -->
      {/if}
    {/if}
  </div>

  {#if mapUrl}
    <EmbededMap {mapUrl} />
  {/if}
  {#if $isAdmin}
    <br />
    <button class="button is-warning" on:click={() => startEdit('mapUrl')}
      >Edit Map</button
    >
  {/if}

  {#if description}
    <p in:fade class="is-size-6 mt-4" style="white-space:pre-line;">
      {description}
    </p>
    {#if $isAdmin}
      <button
        class="button is-warning"
        on:click={() => startEdit('description')}>Edit Description</button
      >
    {/if}
  {/if}
</div>

<div class="modal" class:is-active={showingEdit}>
  <div class="modal-background" on:click={closeEdit} />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Edit {editing}</p>
    </header>
    <section class="modal-card-body">
      <div class="control" class:is-loading={showingPendingEdit}>
        <textarea class="textarea" bind:value={working} />
      </div>
    </section>
    <footer class="modal-card-foot">
      <button
        class="button is-success"
        class:is-loading={showingPendingEdit}
        on:click={editDescription}>Save</button
      >
      <button
        class="button"
        class:is-loading={showingPendingEdit}
        on:click={closeEdit}>Cancel</button
      >
    </footer>
  </div>
  <button
    class="modal-close is-large"
    aria-label="close"
    on:click={closeEdit}
  />
</div>

<div class="modal" class:is-active={showingQr}>
  <div class="modal-background" on:click={closeQR} />
  <div class="modal-content">
    <canvas bind:this={qrCanvas} />
  </div>
  <button class="modal-close is-large" aria-label="close" on:click={closeQR} />
</div>

<style>
  .modal-content {
    width: auto;
  }

  .image-back {
    position: absolute;
    top: 4px;
    left: 4px;
    margin: 4px;
    border-radius: 50%;
  }

  .image-edit {
    position: absolute;
    top: 0px;
    right: 0px;
    margin: 4px;
  }
</style>

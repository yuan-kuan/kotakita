<script>
  import QRious from 'qrious';
  import { isAdmin } from './user_store';
  import { visitingPlace, visitPlace } from './route_store';
  import CheckIn from './CheckIn.svelte';

  export let placeId;

  $: {
    visitPlace(placeId);
  }
  $: name = $visitingPlace.name;
  $: description = $visitingPlace.description;
  $: photoUrl = $visitingPlace.photoUrl;
  $: mapUrl = $visitingPlace.mapUrl;

  let editing;
  $: showingEdit = editing;
  let working = '';
  const startEdit = (attributeName) => {
    working = $visitingPlace[attributeName];
    editing = attributeName;
  };
  const closeEdit = () => {
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
      console.log('editing update ', JSON.stringify(n));
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
    const blob = e.target.files[0];
    const formData = new FormData();
    formData.append('image', blob);

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

        editing = 'photoUrl';
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
  const createQR = () => {
    const data = window.location.toString();
    new QRious({ element: qrCanvas, value: data, size: 300 });

    showingQr = true;
  };
  const closeQR = () => {
    showingQr = false;
  };
</script>

<div class="title has-text-centered pt-2">
  {name}
  {#if $isAdmin}
    <button on:click={() => startEdit('name')}>Edit</button>
    <button class="button" on:click={createQR}>QR</button>
  {/if}
</div>

<img src={photoUrl} alt="The photo of {name}" />
<input
  style="display: none"
  bind:this={cameraInput}
  type="file"
  accept="image/*"
  on:change={photoTaken}
/>
{#if $isAdmin}
  <button on:click={changePhoto}>Change Photo</button>
{/if}

<div class="px-2 pb-2">
  <p class="box desc">{description}</p>
  {#if $isAdmin}
    <button on:click={() => startEdit('description')}>Edit</button>
  {/if}
</div>

<div class="modal" class:is-active={showingEdit}>
  <div class="modal-background" on:click={closeEdit} />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Edit {editing}</p>
    </header>
    <section class="modal-card-body">
      <textarea class="textarea" bind:value={working} />
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" on:click={editDescription}>Save</button>
      <button class="button" on:click={closeEdit}>Cancel</button>
    </footer>
  </div>
  <button
    class="modal-close is-large"
    aria-label="close"
    on:click={closeEdit}
  />
</div>

<!-- svelte-ignore a11y-missing-attribute -->
<iframe
  src={mapUrl}
  width="400"
  height="300"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
/>
{#if $isAdmin}
  <button on:click={() => startEdit('mapUrl')}>Edit Map</button>
{/if}

<CheckIn />

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

  .desc {
    background-color: lightgrey;
  }
</style>

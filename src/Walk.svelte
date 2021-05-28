<script>
  import QRious from 'qrious';
  import { isAdmin } from './user_store';
  import { visitingPlace, visitPlace } from './route_store';
  import CheckIn from './CheckIn.svelte';
  import EmbededMap from './Embeded_Map.svelte';

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

    const expiration = 6000;
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

<figure class="image is-4by5" style="z-index: -1;">
  <img src={photoUrl} alt="The photo of {name}" style="object-fit: cover;" />
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
</figure>

<div
  class="box px-5 has-background-primary has-text-white"
  style="margin-top: -12px; border-radius: 15px;"
>
  <div>
    <span class="is-size-3 has-text-weight-semibold" style="line-height:1em;"
      >{name}</span
    >
    {#if $isAdmin}
      <button class="button is-warning" on:click={() => startEdit('name')}>
        Edit Name
      </button>
      <!-- <button class="button is-small" on:click={createQR}>QR</button> -->
    {/if}
  </div>

  <EmbededMap {mapUrl} />
  {#if $isAdmin}
    <br />
    <button class="button is-warning" on:click={() => startEdit('mapUrl')}
      >Edit Map</button
    >
  {/if}

  <p class="is-size-6 mt-4" style="white-space:pre-line;">{description}</p>
  {#if $isAdmin}
    <button class="button is-warning" on:click={() => startEdit('description')}
      >Edit Description</button
    >
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

  .image-edit {
    position: absolute;
    top: 0px;
    right: 0px;
    margin: 4px;
  }
</style>

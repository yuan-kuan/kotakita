<script>
  import { Link, useNavigate } from 'svelte-navigator';
  import QRious from 'qrious';

  const navigate = useNavigate();

  export let placeId;

  let name;
  let description;
  let mapUrl;
  let nexts;

  const fetchData = async (id) => {
    try {
      let respond = await fetch('/place/' + id);

      if (respond.ok) {
        console.log('respond :>> ', respond);
        let data = await respond.json();
        console.log('data :>> ', data);
        name = data.selected.name;
        description = data.selected.description;
        mapUrl = data.selected.mapUrl;
        nexts = data.nexts;
      } else {
        name = 'Error';
      }
    } catch (error) {
      console.error(error);
    }
  };

  $: {
    fetchData(placeId);
  }

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

<h1>{name}</h1>

<p>{description}</p>

<button class="button is-primary" on:click={createQR}>QR Code</button>

<!-- svelte-ignore a11y-missing-attribute -->
<iframe
  src={mapUrl}
  width="400"
  height="300"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
/>

{#if nexts}
  <button class="button is-link" on:click={navigate('../' + nexts[0][0])}>
    {nexts[0][1]}
  </button>
  <button class="button is-link" on:click={navigate('../' + nexts[1][0])}>
    {nexts[1][1]}
  </button>
{/if}

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
</style>

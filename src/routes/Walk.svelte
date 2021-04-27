<script>
  import { Link } from 'svelte-navigator';
  import QRious from 'qrious';

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

  let qrCanvas;
  const createQR = () => {
    const data = window.location.toString();
    new QRious({ element: qrCanvas, value: data });
  };
</script>

<h1>{name}</h1>

<p>{description}</p>

<button on:click={createQR}>QR Code</button>

<canvas bind:this={qrCanvas} />

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
  <nav>
    <Link to="../../walk/{nexts[0][0]}">{nexts[0][1]}</Link>
    <Link to="../../walk/{nexts[1][0]}">{nexts[1][1]}</Link>
  </nav>
{/if}

<script>
  import { afterUpdate } from 'svelte';
  import QRious from 'qrious';
  
  export let placeId;

  let name;
  let description;

  afterUpdate(async () => {
    try {
      let respond = await fetch('/place/' + placeId);

      if (respond.ok) {
        console.log('respond :>> ', respond);
        let data = await respond.json();
        console.log('data :>> ', data);
        name =  data.name;
        description = data.description;
      } else {
        name = 'Error';
      }
  
    } catch (error) {
      console.error(error);
    }
  });

  let qrCanvas;
  const createQR = () => {
    const data = window.location.toString();
    new QRious({element: qrCanvas, value: data});
  };
</script>

<h1>{name}</h1>

<p>{description}</p>

<button on:click={createQR}>QR Code</button>

<canvas bind:this = {qrCanvas}></canvas>
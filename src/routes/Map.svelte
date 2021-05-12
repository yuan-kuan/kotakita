<script>
  let places = [{ name: 'a' }, { name: 'b' }];

  const sendData = async (id) => {
    console.log('did I send?');
    try {
      let respond = await fetch('/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ just: 'kidding' }),
      });

      if (respond.ok) {
        console.log('respond :>> ', respond);
      } else {
        console.error(respond);
      }
    } catch (error) {
      console.error(error);
    }
  };
</script>

<ul>
  {#each places as place}
    <li>
      {place.name}
    </li>
  {/each}
</ul>
<button on:click={sendData}>Add</button>

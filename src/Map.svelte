<script>
  import { onMount } from 'svelte';
  import { Link } from 'svelte-navigator';
  import { isAdmin } from './user_store';

  let newPlace;
  const addNewPlace = async (id) => {
    try {
      let respond = await fetch('/place', {
        method: 'POST',
        // credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPlace }),
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
      <Link to={place.key}>{place.name}</Link>
      {#if $isAdmin}
        <button on:click={deletePlace(place.key)}>X</button>
      {/if}
    </li>
  {/each}
</ul>
<input type="text" bind:value={newPlace} />
<button on:click={getAllPlaces}>Refresh</button>
<br />
{#if $isAdmin}
  <button on:click={addNewPlace}>Add</button>
  <button on:click={prefill}>Pre Fill</button>
{/if}

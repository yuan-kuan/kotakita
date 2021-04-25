<script>
  let name;
  let description;
  import { onMount } from 'svelte';

  onMount(async () => {
    try {
      let data = await (await fetch('/place/kk')).json();

      name = data.name;
      description = data.description;
    } catch (error) {
      console.error(error);
    }
  });
</script>

<h1>{name}</h1>

<p>{description}</p>

<script>
  export let placeId;

  let name;
  let description;
  import { afterUpdate } from 'svelte'

  afterUpdate(async () => {
    try {
      let respond = await fetch('/place/' + placeId);

      if (respond.ok) {
        console.log('respond :>> ', respond);
        let data = await respond.json()
        console.log('data :>> ', data);
        name =  data.name;
        description = data.description;
      } else {
        name = 'Error';
      }
      
    } catch (error) {
      console.error(error);
    }
  })
</script>

<h1>{name}</h1>

<p>{description}</p>

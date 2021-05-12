<script>
  let places = [{ name: 'a' }, { name: 'b' }];
</script>

<ul>
  {#each places as place}
    <li>
      {place.name}
    </li>
  {/each}
</ul>

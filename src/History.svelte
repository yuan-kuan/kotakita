<script>
  import { getTodayRoutes } from './route_store';
</script>

<p>History</p>

{#await getTodayRoutes()}
  <p>loading...</p>
{:then routes}
  {#each routes as route}
    <div>
      <p>{route}</p>
    </div>
  {/each}
{/await}

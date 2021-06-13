<script>
  import { getTodayRoutes } from './route_store';
</script>

<section class="section has-background-primary ">
  <p class="title pt-2 has-text-white">Itinerary</p>
</section>

{#await getTodayRoutes()}
  <p>loading...</p>
{:then routes}
  <div class="box">
    <ul class="steps is-vertical is-small">
      {#each routes as route}
        <li class="steps-segment">
          <span href="#" class="steps-marker" />
          <div class="steps-content pb-5">
            <p class="is-size-4">{route}</p>
            <p class="is-size-7 has-text-weight-light">
              Sat Jun 12 20:05:19 MYT 2021
            </p>
            <button class="button pt-4 is-link is-inverted">
              <span class="icon">
                <i class="fas fa-star" />
              </span>
              <span>View or edit rating</span>
            </button>
          </div>
        </li>
      {/each}
    </ul>
  </div>
{/await}

<style>
  /* Direct hack onto steps content */
  .steps.is-small.is-vertical .steps-content {
    margin-top: -1.6rem;
  }

  /* Hack to bring icon inline with button text */
  .icon {
    display: inline;
  }
</style>

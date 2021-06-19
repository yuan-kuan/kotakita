<script>
  import Rating from './Rating.svelte';
  import { getTodayRoutes } from './route_store';

  const prettyDateTime = (ms) => {
    const d = new Date(ms);
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    console.log(d.toLocaleDateString('en-US', options)); // Saturday, September 17, 2016
    return d.toLocaleDateString('en-US', options);
  };

  var isRating = false;
  var activeRnR;
  const rate = (routeAndRate) => {
    isRating = true;
    activeRnR = routeAndRate;
  };

  const stopRating = () => (isRating = false);
</script>

<section class="section has-background-primary ">
  <p class="title pt-2 has-text-white">Itinerary</p>
</section>

{#await getTodayRoutes()}
  <p>loading...</p>
{:then routeAndRatings}
  <div class="box">
    <ul class="steps is-vertical is-small">
      {#each routeAndRatings as rnr}
        <li class="steps-segment">
          <span href="#" class="steps-marker" />
          <div class="steps-content pb-5">
            <p class="is-size-4">{rnr.from[0]}</p>
            <p class="is-size-7 has-text-weight-light">
              {prettyDateTime(rnr.from[1])}
            </p>
            {#if rnr.rating}
              <p class="is-size-7 has-text-weight-light">
                {rnr.rating.rating}
              </p>
              <button
                class="button pt-4 is-link is-inverted"
                on:click={() => rate(rnr)}
              >
                <span class="icon">
                  <i class="fas fa-star" />
                </span>
                <span>View or edit rating</span>
              </button>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  </div>
{/await}

{#if isRating}
  <Rating from={activeRnR.from} to={activeRnR.to} on:click={stopRating} />
{/if}

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

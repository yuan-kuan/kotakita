<script>
  import { checkedIn, checkIn } from './route_store';
</script>

<!-- background-image: url('/_static/bookmark-star-fill.svg');
background-repeat: no-repeat;
height: 72px;
width: 72px; -->
<div
  class="has-text-link"
  style="

  margin-top: -48px;
  position: absolute;
  right: 16px;
  "
>
  <img
    style="
    -webkit-filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7));
  filter: drop-shadow( 2px 2px 1px rgba(0, 0, 0, .5));
  "
    src="/_static/bookmark-star-fill.svg"
    alt="rate route button"
  />
</div>

<div
  class="is-flex has-background-light has-text-white has-text-centered"
  style="
  margin-top: -32px;
  padding-bottom: 18px;
  margin-bottom: -20px;
  border-radius: 6px;
  "
>
  <div>
    {#if $checkedIn}
      Already Checked In, welcome!
    {:else}
      New here? Check in first!
    {/if}
  </div>

  <div />
</div>

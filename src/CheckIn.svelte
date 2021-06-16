<script>
  import { checkedIn, checkIn } from './route_store';
</script>

<div
  class=" is-flex is-flex-direction-column is-align-items-center is-size-7 has-text-white has-background-link"
  style="
  margin-top: -54px;
  position: absolute;
  right: 16px;
  height: 72px;
  width: 72px;
  border-radius: 50%;
  box-shadow: rgb(0 0 0 / 50%) 2px 2px 5px;
  "
  on:click={checkIn}
>
  <span class="mt-2 icon is-medium">
    <i class="fas fa-2x fa-sign-in-alt" />
  </span>
  <span> Check-in</span>
</div>

<div
  class="is-flex is-flex-direction-row-reverse has-background-light"
  style="
  margin-top: -32px;
  padding-bottom: 20px;
  margin-bottom: -20px;
  border-radius: 6px;
  "
>
  <span class="is-flex-shrink-0" style="width: 96px;" />

  <div class="is-size-7 has-text-white has-text-right">
    {#if $checkedIn}
      Already Checked In, welcome!
    {:else}
      New here? Check in first!
    {/if}
  </div>

  <div />
</div>

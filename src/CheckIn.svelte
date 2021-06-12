<script>
  import { checkedIn, checkIn } from './route_store';
</script>

<div
  class="has-background-light has-text-white has-text-centered"
  style="
  margin-top: -32px;
  padding-bottom: 18px;
  margin-bottom: -20px;
  border-radius: 6px;
  "
>
  {#if $checkedIn}
    Already Checked In, welcome!
  {:else}
    New here? Check in first!
  {/if}
</div>

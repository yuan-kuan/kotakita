<script>
  import { checkedIn, checkIn } from './route_store';
</script>

<div class="navbar is-fixed-bottom">
  {#if $checkedIn}
    Already Checked In, welcome!
  {:else}
    New here? Check in first!
    <button on:click={checkIn}>Check In</button>
  {/if}
</div>

<script>
  import Profile from './Profile.svelte';
</script>

<nav class="level py-2 navbar is-fixed-bottom is-mobile">
  <div class="level-item">
    <Profile />
  </div>
  <div class="level-item is-flex-direction-column">
    <span class="icon is-medium has-text-grey-lighter">
      <i class="fas fa-2x fa-map-marker-alt" />
    </span>
    <span class="is-size-7 has-text-grey-lighter">Itinerary</span>
  </div>

  <div class="level-item is-flex-direction-column">
    <span class="icon is-medium has-text-primary ">
      <i class="fas fa-2x fa-map-marked-alt" />
    </span>
    <span class="is-size-7 has-text-primary">Map</span>
  </div>

  <div class="level-item  is-flex-direction-column">
    <span class="icon is-medium has-text-grey-lighter">
      <i class="fas fa-2x fa-qrcode" />
    </span>
    <span class="is-size-7 has-text-grey-lighter">Scan QR</span>
  </div>
</nav>

<style>
  nav {
    /* soft top shadow */
    box-shadow: inset 0px 2px 1px rgb(50 50 50 / 20%);
  }
</style>

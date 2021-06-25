<script>
  import { navigate, useMatch } from 'svelte-navigator';
  import Profile from './Profile.svelte';

  const mapMatch = useMatch('/walk/*');
  const historyMatch = useMatch('/history/*');

  $: isShowingMap = $mapMatch != undefined;
  $: isShowingHistory = $historyMatch != undefined;

  $: console.log(
    'isShowingMap ',
    isShowingMap,
    ' isShowingHistory ',
    isShowingHistory
  );
</script>

<nav
  class="container level py-2 navbar is-fixed-bottom is-mobile"
  style="max-width: 640px;"
>
  <div class="level-item">
    <Profile />
  </div>
  <div
    class="level-item is-flex-direction-column"
    on:click={() => navigate('/history')}
  >
    <span
      class="icon is-medium {isShowingHistory
        ? 'has-text-primary'
        : 'has-text-grey-lighter'}"
    >
      <i class="fas fa-2x fa-map-marker-alt" />
    </span>
    <span
      class="is-size-7 {isShowingHistory
        ? 'has-text-primary'
        : 'has-text-grey-lighter'}">Itinerary</span
    >
  </div>

  <div
    class="level-item is-flex-direction-column"
    on:click={() => navigate('/walk')}
  >
    <span
      class="icon is-medium {isShowingMap
        ? 'has-text-primary'
        : 'has-text-grey-lighter'} "
    >
      <i class="fas fa-2x fa-map-marked-alt" />
    </span>
    <span
      class="is-size-7 {isShowingMap
        ? 'has-text-primary'
        : 'has-text-grey-lighter'}">Map</span
    >
  </div>

  <!-- <div class="level-item  is-flex-direction-column">
    <span class="icon is-medium has-text-grey-lightest">
      <i class="fas fa-2x fa-qrcode" />
    </span>
    <span class="is-size-7 has-text-grey-lightest">Scan QR</span>
  </div> -->
</nav>

<style>
  nav {
    /* soft top shadow */
    box-shadow: inset 0px 2px 1px rgb(50 50 50 / 20%);
  }
</style>

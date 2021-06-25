<script>
  import { Router, Route } from 'svelte-navigator';
  import { onMount } from 'svelte';
  import { Loader } from '@googlemaps/js-api-loader';
  import Walk from './Walk.svelte';

  import { useMatch } from 'svelte-navigator';
  import AdminCheckpoints from './AdminCheckpoints.svelte';

  const relativeMatch = useMatch(':placeId');

  $: isShowingMap = $relativeMatch?.params?.placeId == undefined;

  let mapDiv;
  const loader = new Loader({
    apiKey: 'AIzaSyCVOJFGHCb-6UaNvqQ7LvKMKxUbR_mIAP8',
    version: 'weekly',
    // libraries: ['places'],
  });

  const mapOptions = {
    center: {
      lat: 5.9846474,
      lng: 116.077384,
    },
    zoom: 16.5,
    mapId: 'bb6abb3bae6e3585',
    disableDefaultUI: true,
  };

  onMount(async () => {
    console.log('on mount Map, calling Google');
    // const google = await loader.load();
    // const map = new google.maps.Map(mapDiv, mapOptions);
    // // Create an info window to share between markers.
    // const infoWindow = new google.maps.InfoWindow();
    // const marker = new google.maps.Marker({
    //   position: { lat: 5.98230833933885, lng: 116.07628337297034 },
    //   map,
    //   title: 'Gaya The Stree',
    // });
    // marker.addListener('click', () => {
    //   infoWindow.close();
    //   infoWindow.setContent(marker.getTitle());
    //   infoWindow.open(marker.getMap(), marker);
    // });
  });
</script>

<!-- <div
  class="block has-background-danger {isShowingMap ? '' : 'is-hidden'}"
  style="height: 100vh;"
  bind:this={mapDiv}
  /> -->

<div
  class="block has-background-danger {isShowingMap ? '' : 'is-hidden'}"
  style="height: 100vh;"
>
  <section class="section has-background-primary ">
    <p class="title has-text-white">Check-points</p>
  </section>
  <AdminCheckpoints />
</div>

<Router>
  <Route path=":id" let:params let:navigate>
    <Walk placeId={params.id} {navigate} />
  </Route>
</Router>

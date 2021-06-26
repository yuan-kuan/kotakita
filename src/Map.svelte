<script>
  import { Router, Route, useMatch } from 'svelte-navigator';
  import { onMount } from 'svelte';
  import { Loader } from '@googlemaps/js-api-loader';

  import { allPlaces } from './place_store';
  import Walk from './Walk.svelte';

  const relativeMatch = useMatch(':placeId');
  export let navigate;

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

  let google;
  let map;
  let markers;
  let infoWindow;
  let panel;
  let panelTitle;
  let panelPlaceKey;

  let startUsingPanel = false;

  onMount(async () => {
    console.log('on mount Map, calling Google');
    google = await loader.load();
    map = new google.maps.Map(mapDiv, mapOptions);
    // Create an info window to share between markers.
    infoWindow = new google.maps.InfoWindow();

    const markerIcon = {
      url: '/_static/kk_mappin.png', // url
      scaledSize: new google.maps.Size(27, 48), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(13, 46), // anchor
    };

    allPlaces.subscribe((places) => {
      console.log('setting up markers');
      for (const place of places) {
        if (place.lat) {
          const marker = new google.maps.Marker({
            position: { lat: place.lat, lng: place.long },
            map,
            title: place.name,
            icon: markerIcon,
          });
          marker.addListener('click', () => {
            startUsingPanel = true;
            panelTitle = place.name;
            panelPlaceKey = place.key;
            infoWindow.close();
            infoWindow.setContent(panel);
            infoWindow.open(map, marker);
          });
        } else {
          console.warn('The ', place.slug, ' has no lat long');
        }
      }
    });
  });

  const panelNavigate = () => {
    // navigate(panelPlaceKey);
    navigate('gaya-street');
  };
</script>

<section
  class="section has-background-primary {isShowingMap ? '' : 'is-hidden'}"
>
  <p class="title pt-2 has-text-white">Check-points</p>
</section>

<div
  bind:this={mapDiv}
  class="has-background-danger {isShowingMap ? '' : 'is-hidden'}"
  style="height: calc(100vh - 76px - 66px);"
>
  <!-- on:click={panelNavigate} -->
  <!-- <AdminCheckpoints /> -->
</div>

<Router>
  <Route path=":id" let:params let:navigate>
    <Walk placeId={params.id} {navigate} />
  </Route>
</Router>

<div
  class="has-text-centered {startUsingPanel ? '' : 'is-hidden'}"
  bind:this={panel}
>
  <p class="is-size-4 has-text-weigth-bold">{panelTitle}</p>
  <button class="p-2 mt-2 button is-primary" on:click={panelNavigate}
    >Check it out!</button
  >
</div>

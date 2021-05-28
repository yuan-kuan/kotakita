<script>
  import '../mystyles.css';
  // import 'bulma/css/bulma.css';

  import { Router, Route, Link } from 'svelte-navigator';
  import Map from './Map.svelte';
  import Walk from './Walk.svelte';
  import History from './History.svelte';
  import BottomBar from './BottomBar.svelte';
</script>

<Router>
  <div>
    <Route path="/">
      <Map />
    </Route>
    <Route path="walk/*">
      <Route path="/">
        <Map />
      </Route>
      <Route path=":id" let:params>
        <Walk placeId={params.id} />
      </Route>
    </Route>
    <Route path="/history">
      <History />
    </Route>
  </div>
</Router>

<BottomBar />

<!-- <footer class="footer is-small">
  <div class="content">
    <p class="title">Kota Kita</p>
    <div class="subtitle">
      <Profile />
    </div>
  </div>
</footer> -->

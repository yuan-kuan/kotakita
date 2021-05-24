<script>
  import 'bulma/css/bulma.css';

  import { Router, Route, Link } from 'svelte-navigator';
  import Map from './Map.svelte';
  import Walk from './Walk.svelte';
  import History from './History.svelte';
  import Profile from './Profile.svelte';
</script>

<section class="hero is-warning is-small">
  <div class="hero-body">
    <p class="title">Kota Kita</p>
    <div class="subtitle">
      <Profile />
    </div>
  </div>
</section>

<Router>
  <Link to="/">Map</Link>
  <Link to="/history">history</Link>
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

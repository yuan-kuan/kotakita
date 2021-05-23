<script>
  import 'bulma/css/bulma.css';

  import { Router, Route, Link } from 'svelte-navigator';
  import Map from './Map.svelte';
  import Walk from './Walk.svelte';
  import { tryAdminAccess, userProfile, forgetUser } from './user_store';
  import History from './History.svelte';

  $: userId = $userProfile.id;
</script>

<section class="hero is-warning is-small">
  <div class="hero-body">
    <p class="title">Kota Kita</p>
    <div class="subtitle">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label>{userId}</label>
      <button on:click={forgetUser}>Forget Me</button>
    </div>
  </div>

  <button on:click={tryAdminAccess}>Admin Access</button>
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

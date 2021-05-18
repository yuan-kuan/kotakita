<script>
  import 'bulma/css/bulma.css';

  import { Router, Route } from 'svelte-navigator';
  import Map from './routes/Map.svelte';
  import Walk from './routes/Walk.svelte';
  import { tryAdminAccess, userProfile } from './user_store';

  $: userId = $userProfile.id;
</script>

<section class="hero is-warning is-small">
  <div class="hero-body">
    <p class="title">Kota Kita</p>
    <p class="subtitle">{userId}</p>
  </div>

  <button on:click={tryAdminAccess}>Admin Access</button>
</section>

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
  </div>
</Router>

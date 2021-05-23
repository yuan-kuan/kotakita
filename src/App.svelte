<script>
  import 'bulma/css/bulma.css';

  import { Router, Route } from 'svelte-navigator';
  import Map from './Map.svelte';
  import Walk from './Walk.svelte';
  import { tryAdminAccess, userProfile, forgetUser } from './user_store';

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

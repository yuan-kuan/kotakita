<script>
  import 'bulma/css/bulma.css';

  import { Router, Route } from 'svelte-navigator';
  import Home from './routes/Home.svelte';
  import Map from './routes/Map.svelte';
  import Walk from './routes/Walk.svelte';

  const signIn = async () => {
    const respond = await fetch('/admin-access', {
      method: 'POST',
    });

    console.log('respond :>> ', respond);
  };
</script>

<section class="hero is-warning is-small">
  <div class="hero-body">
    <p class="title">Kota Kita</p>
    <p class="subtitle">Work In Progress!!!</p>
  </div>
  <button on:click={signIn}>Sign in</button>
</section>

<Router>
  <div>
    <Route path="/">
      <Home />
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

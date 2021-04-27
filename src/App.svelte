<script>
  import 'bulma/css/bulma.css';

  import { Router, Route } from 'svelte-navigator';
  import Home from './routes/Home.svelte';
  import Walk from './routes/Walk.svelte';
</script>

<section class="hero is-warning is-small">
  <div class="hero-body">
    <p class="title">Kota Kita</p>
    <p class="subtitle">Work In Progress!!!</p>
  </div>
</section>

<Router>
  <div>
    <Route path="/">
      <Home />
    </Route>
    <Route path="walk/*">
      <Route path="/">
        <Walk />
      </Route>
      <Route path=":id" let:params>
        <Walk placeId={params.id} />
      </Route>
    </Route>
  </div>
</Router>

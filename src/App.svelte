<script>
  // Build this with `npm run build-css`
  import '../mystyles.css';
  // import 'bulma/css/bulma.css';

  import { Router, Route } from 'svelte-navigator';
  import Map from './Map.svelte';
  import Walk from './Walk.svelte';
  import History from './History.svelte';
  import BottomBar from './BottomBar.svelte';
  import Admin from './Admin.svelte';
</script>

<!-- Pad to show full content above bottom bar -->
<div class="container" style="max-width: 640px; padding-bottom: 40px;">
  <Router>
    <Route path="/" let:navigate>
      Redirecting...
      {navigate('walk')}
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
    <Route path="/office">
      <Admin />
    </Route>
  </Router>
</div>

<BottomBar />

<script>
  // Build this with `npm run build-css`
  import '../mystyles.css';

  import { Router, Route } from 'svelte-navigator';
  import Map from './Map.svelte';
  import Walk from './Walk.svelte';
  import History from './History.svelte';
  import BottomBar from './BottomBar.svelte';
  import Admin from './Admin.svelte';
</script>

<!-- Pad to show full content above bottom bar -->
<div class="container" style="max-width: 640px; padding-bottom: 40px;">
  <Router primary={false}>
    <Route path="/" let:navigate>
      Redirecting...
      {navigate('walk')}
    </Route>
    <Route path="/walk/*" let:navigate>
      <Map {navigate} />
    </Route>
    <Route path="/history">
      <History />
    </Route>
    <Route path="/office/*">
      <Route path="/">
        <Admin />
      </Route>
      <Route path=":id" let:params let:navigate>
        <Walk placeId={params.id} {navigate} />
      </Route>
    </Route>
    <BottomBar />
  </Router>
</div>

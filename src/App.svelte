<script>
  // Build this with `npm run build-css`
  import '../mystyles.css';

  import { Router, Route } from 'svelte-navigator';
  import Map from './Map.svelte';
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
    <Route path="/walk/*">
      <Map />
    </Route>
    <Route path="/history">
      <History />
    </Route>
    <Route path="/office">
      <Admin />
    </Route>
    <BottomBar />
  </Router>
</div>

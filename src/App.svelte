<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import Walk from "./routes/Walk.svelte";
  import Search from "./routes/Search.svelte";
</script>

<main>
  <h3>KokaKika!</h3>
</main>

<Router>
  <nav>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
    <Link to="walk/pasar-besar">Walk</Link>
  </nav>
  <div>
    <Route path="/">
      <Home />
    </Route>
    <Route path="about" component={About} />
    <Route path="walk/*">
      <Route path="/">
        <Walk />
      </Route>
      <Route path=":id" let:params>
        <Walk placeId={params.id} />
      </Route>
    </Route>
    <Route path="search/:query" let:params>
      <Search query={params.query} />
    </Route>
  </div>
</Router>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

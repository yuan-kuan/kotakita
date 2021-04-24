<script>
  import { onMount } from 'svelte'
  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import Blog from "./routes/Blog.svelte";
  import Search from "./routes/Search.svelte";
</script>

<main>
  <h3>KokaKika!</h3>
</main>

<Router>
  <nav>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
    <Link to="blog">Blog</Link>
  </nav>
  <div>
    <Route path="/">
      <Home />
    </Route>
    <Route path="about" component={About} />
    <Route path="blog/*">
      <Route path="/">
        <Blog />
      </Route>
      <Route path=":id" component={Blog} />
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

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<script>
  import { Router, Link, Route } from 'svelte-navigator';
  import Home from './routes/Home.svelte';
  import About from './routes/About.svelte';
  import Walk from './routes/Walk.svelte';
  import Search from './routes/Search.svelte';
</script>

<main>
  <h3>KokaKika!</h3>
</main>

<Router>
  <nav>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
    <Link to="walk/pasar-besar">Walk</Link>
    <!-- svelte-ignore a11y-missing-content -->
    <a href="https://www.facebook.com/kotakitasabah" class="fa fa-facebook" />
    <!-- svelte-ignore a11y-missing-content -->
    <a href="https://twitter.com/kotaKitaSabah" class="fa fa-twitter" />
    <!-- svelte-ignore a11y-missing-content -->
    <a
      href="https://www.instagram.com/kotakitasabah/"
      class="fa fa-instagram"
    />
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

  /* Style all font awesome icons */
  .fa {
    padding: 20px;
    font-size: 30px;
    width: 30px;
    text-align: center;
    text-decoration: none;
  }

  /* Add a hover effect if you want */
  .fa:hover {
    opacity: 0.7;
  }

  /* Set a specific color for each brand */

  /* Facebook */
  .fa-facebook {
    background: #3b5998;
    color: white;
  }

  /* Twitter */
  .fa-twitter {
    background: #55acee;
    color: white;
  }
  .fa-instagram {
    background: #125688;
    color: white;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

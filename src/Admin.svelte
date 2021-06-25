<script>
  import AdminQuestion from './AdminQuestion.svelte';
  import { isAdmin, tryAdminAccess } from './user_store';

  let currentTab = 'cp';
</script>

<section class="section has-background-warning ">
  <p class="title has-text-white">Kota Kita Office</p>
</section>

{#if $isAdmin}
  <div class="tabs is-centered">
    <ul>
      <!-- svelte-ignore a11y-missing-attribute -->
      <li class:is-active={currentTab == 'cp'}>
        <a on:click={() => (currentTab = 'cp')}>CheckPoints</a>
      </li>
      <!-- svelte-ignore a11y-missing-attribute -->
      <li class:is-active={currentTab == 'q'}>
        <a on:click={() => (currentTab = 'q')}>Question</a>
      </li>
    </ul>
  </div>

  {#if currentTab == 'cp'}
    <div>list here</div>
  {:else}
    <AdminQuestion />
  {/if}
{:else}
  <div class="box has-text-centered">
    <p>Only admin allows here.</p>
    <button class="button is-warning" on:click={tryAdminAccess}
      >Admin Access</button
    >
  </div>
{/if}

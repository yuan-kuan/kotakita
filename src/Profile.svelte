<script>
  import { tryAdminAccess, userProfile, forgetUser } from './user_store';

  $: name = $userProfile.id;

  let isShowingDropDown = false;
</script>

<svelte:window on:click={() => (isShowingDropDown = false)} />

<div
  class="dropdown"
  class:is-active={isShowingDropDown}
  on:click|stopPropagation
>
  <div class="dropdown-trigger">
    <button
      class="button"
      on:click={() => (isShowingDropDown = !isShowingDropDown)}
    >
      <span>Setting</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" />
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu2" role="menu">
    <div class="dropdown-content">
      <div class="dropdown-item">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>Logged in as:</label>
        <strong>{name}</strong>
      </div>
      <hr class="dropdown-divider" />
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="#" class="dropdown-item" on:click={forgetUser}> Forget Me </a>
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="#" class="dropdown-item" on:click={tryAdminAccess}>
        Admin Access
      </a>
    </div>
  </div>
</div>

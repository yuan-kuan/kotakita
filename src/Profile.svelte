<script>
  import ProfileUpdater from './ProfileUpdater.svelte';
  import { tryAdminAccess, userProfile, forgetUser } from './user_store';

  $: name = $userProfile.name ?? 'New User';

  let otherInfo = '';
  $: {
    otherInfo = '';
    if (
      $userProfile.gender &&
      ($userProfile.gender != '' || $userProfile.gender != 'private')
    )
      otherInfo += `${$userProfile.gender}`;
    if ($userProfile.age) otherInfo += `(${$userProfile.age})`;
    if ($userProfile.oku) otherInfo += ', has disability';
  }

  let isShowingDropDown = false;
  const closeDropdown = () => (isShowingDropDown = false);

  let isShowingInfoUpdate = false;
  const showInfoUpdate = () => {
    isShowingInfoUpdate = true;
    closeDropdown();
  };
  const closingInfoUpdate = () => {
    isShowingInfoUpdate = false;
  };
</script>

<svelte:window on:click={closeDropdown} />

<div
  class="dropdown"
  class:is-active={isShowingDropDown}
  on:click|stopPropagation
>
  <div class="dropdown-trigger">
    <button class="button" on:click={() => (isShowingDropDown = true)}>
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
        <p class="is-size-7 is-italic">{otherInfo}</p>
      </div>
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="#" class="dropdown-item" on:click={showInfoUpdate}>
        Update Information
      </a>
      <hr class="dropdown-divider" />
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a
        href="#"
        class="dropdown-item"
        on:click={forgetUser}
        on:click={closeDropdown}
      >
        Forget Me
      </a>
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a
        href="#"
        class="dropdown-item"
        on:click={tryAdminAccess}
        on:click={closeDropdown}
      >
        Admin Access
      </a>
    </div>
  </div>
</div>

{#if isShowingInfoUpdate}
  <ProfileUpdater on:click={closingInfoUpdate} />
{/if}

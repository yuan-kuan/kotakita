<script>
  import { tryAdminAccess, userProfile, forgetUser } from './user_store';

  $: name = $userProfile.id;

  let isShowingDropDown = false;
  const closeDropdown = () => (isShowingDropDown = false);

  let isShowingInfoUpdate = false;
  const showInfoUpdate = () => {
    isShowingInfoUpdate = true;
    closeDropdown();
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
      </div>
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="#" class="dropdown-item" on:click={showInfoUpdate}>
        Update Information
      </a>
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

<div class="modal" class:is-active={isShowingInfoUpdate}>
  <div
    class="modal-background"
    on:click={() => (isShowingInfoUpdate = false)}
  />
  <div class="modal-content box">
    <div class="field">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Any Name" />
      </div>
    </div>

    <div class="field">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">Age</label>
      <div class="control">
        <input class="input" type="number" placeholder="Your age" />
      </div>
    </div>

    <div class="select mt-3">
      <select>
        <option>Gender</option>
        <option>Female</option>
        <option>Male</option>
        <option>Private</option>
      </select>
    </div>

    <label class="checkbox mt-3">
      <input type="checkbox" />
      Do you identify as a person with a disability?
    </label>

    <div class="level mt-4">
      <button class="button is-success">Save</button>
      <button class="button is-warning">Cancel</button>
    </div>
  </div>
  <button
    class="modal-close is-large"
    on:click={() => (isShowingInfoUpdate = false)}
  />
</div>

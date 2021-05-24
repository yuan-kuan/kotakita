<script>
  import { userProfile, updateInfo } from './user_store';

  let name = $userProfile.name;
  let age = $userProfile.age;
  let gender = $userProfile.gender;
  let oku = $userProfile.oku;

  let isShowingInfoUpdate = false;
  const showInfoUpdate = () => {
    isShowingInfoUpdate = true;
    closeDropdown();
  };

  const saveProfile = () => {
    updateInfo(name, age, gender, oku);
  };
</script>

<div class="modal is-active">
  <div class="modal-background" on:click />
  <div class="modal-content box">
    <div class="field">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">Name</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Any Name"
          bind:value={name}
        />
      </div>
    </div>

    <div class="field">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">Age</label>
      <div class="control">
        <input
          class="input"
          type="number"
          placeholder="Your age"
          bind:value={age}
        />
      </div>
    </div>

    <div class="select mt-3">
      <select bind:value={gender}>
        <option value="">Gender</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
        <option value="Private">Private</option>
      </select>
    </div>

    <label class="checkbox mt-3">
      <input type="checkbox" bind:checked={oku} />
      Do you identify as a person with a disability?
    </label>

    <div class="level mt-4">
      <button class="button is-success" on:click={saveProfile} on:click
        >Save</button
      >
      <button class="button is-warning" on:click>Cancel</button>
    </div>
  </div>
  <button class="modal-close is-large" on:click />
</div>

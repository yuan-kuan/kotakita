import { readable } from 'svelte/store';

let settingAllPlace;
export const allPlaces = readable([], (set) => {
  settingAllPlace = set;
  preparePlaces();
});

let places = [];
let placeMap = {};
export const preparePlaces = async () => {
  try {
    let respond = await fetch('/all-places');
    places = await respond.json();
    places.forEach((q) => {
      placeMap[q.key] = q;
    });

    settingAllPlace(places);
  } catch (error) {
    console.error(error);
  }
};

export const preparePlaceMap = async () => {
  await new Promise((resolve) => {
    allPlaces.subscribe((v) => {
      if (v.length > 0) resolve();
    });
  });
};

export const deletePlace = async (editingPlaceId) => {
  try {
    let respond = await fetch('/place/' + editingPlaceId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (respond.ok) {
      preparePlaces();
    } else {
      console.error(respond);
    }
  } catch (error) {
    console.error(error);
  }
};

export const changeSlug = async (editingPlaceId, slug) => {
  try {
    await fetch('/url/' + editingPlaceId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slug),
    });
  } catch (error) {
    console.error(error);
  } finally {
    preparePlaces();
  }
};

export const changeOrder = async (editingPlaceId, order) => {
  try {
    await fetch('/order/' + editingPlaceId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: order,
    });
  } catch (error) {
    console.error(error);
  } finally {
    preparePlaces();
  }
};

export const addNewPlace = async (name, slug) => {
  try {
    let respond = await fetch('/place', {
      method: 'POST',
      // credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, slug }),
    });

    if (respond.ok) {
      preparePlaces();
    } else {
      console.error(respond);
    }
  } catch (error) {
    console.error(error);
  }
};

export const prefill = async () => {
  try {
    let respond = await fetch('/prefill', {
      method: 'POST',
    });

    if (respond.ok) {
      preparePlaces();
    } else {
      console.error(respond);
    }
  } catch (error) {
    console.error(error);
  }
};

export const keyToName = (key) => {
  return placeMap[key].name;
};

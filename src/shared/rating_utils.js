const generateUserString = (userProfile) => {
  const age = userProfile.age ? userProfile.age : '0';
  const gender = userProfile.gender ? userProfile.gender : '0';
  const oku = userProfile.oku ? userProfile.oku : '0';
  const name = userProfile.name ? userProfile.name : '0';

  return `${age}-${gender}-${oku}-${name}`;
};

const dataKeysOfRating = (ratingPayload) => {
  const table = ratingPayload.to + '_' + ratingPayload.from;
  const userString = generateUserString(ratingPayload.userProfile);
  const key = ratingPayload.time + '_' + userString;

  return {
    table,
    key,
  };
};

exports.dataKeysOfRating = dataKeysOfRating;

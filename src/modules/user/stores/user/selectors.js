import moize from 'moize';

export const getUserName = moize(
  state => {
    console.log('getUserName');
    return state.username;
  },
  { isDeepEqual: true }
);

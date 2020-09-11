import moize from 'moize';

export const getNotification = moize(state => state, { isDeepEqual: true });

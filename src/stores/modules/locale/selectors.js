import moize from 'moize';

export const getCurrentLocale = moize(state => state.language, { isDeepEqual: true });

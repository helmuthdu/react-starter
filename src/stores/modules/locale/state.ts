export type State = Readonly<{
  language: 'en';
  messages: Record<string, string>;
}>;

export const initialState: State = {
  language: 'en',
  messages: {}
};

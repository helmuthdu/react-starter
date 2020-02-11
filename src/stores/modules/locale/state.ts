export enum SupportedLanguages {
  English = 'en'
}

export type State = Readonly<{
  language: SupportedLanguages;
  messages: Record<string, string>;
}>;

export const initialState: State = {
  language: SupportedLanguages.English,
  messages: {}
};

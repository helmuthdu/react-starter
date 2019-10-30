# StoreContext

Super simple state management for React apps.

## Usage

1. Wrap your React App into `StoreProvider`.
2. Pass default state and reducer (simple function that accepts `state` object and `action` object):

```jsx harmony
const App = () => {
  const initialState = {
    theme: { primary: 'green' }
  };

  const actions = {
    changeTheme: (state, payload) => ({
      ...state,
      theme: payload
    })
  };

  const reducer = (state, action) => {
    return actions[action.type] ? actions[action.type](state, action.payload) : state;
  };

  return (
    <StoreProvider initialState={initialState} reducer={reducer}>
      // App content ...
    </StoreProvider>
  );
};
```

3\. Use and update your state in any component inside your App.
`getState` function returns array, where first item is `state` object and second item is `dispatch` function that accepts the `action` as a parameter.

```jsx harmony
const ThemedButton = () => {
  const [{ theme }, dispatch] = useState();

  return (
    <Button
      primaryColor={theme.primary}
      onClick={() =>
        dispatch({
          type: 'changeTheme',
          newTheme: { primary: 'blue' }
        })
      }>
      Make me blue!
    </Button>
  );
};
```

## Typescript

```typescript jsx
const App = () => {
  type ITheme = {
    primary: string;
  };

  type State = {
    theme: ITheme;
  };

  const initialState: State = {
    theme: { primary: 'green' }
  };

  type Actions = {
    changeTheme: (state: State, value: any) => State;
  };

  const actions: Actions = {
    changeTheme: (state: State, payload: any) => ({
      ...state,
      theme: payload
    })
  };

  type Action = { type: keyof Actions; payload?: any };

  const reducer = (state: State, action: Action) => {
    return actions[action.type] ? actions[action.type](state, action.payload) : state;
  };

  return (
    <StoreProvider initialState={initialState} reducer={reducer}>
      // App content ...
    </StoreProvider>
  );
};
```

That's it. State management have never been easier!

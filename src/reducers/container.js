function loadComponent(state, action) {
  const component = action.component;
  return { ...state, component };
}

export default function(state = {}, action) {
  switch (action.type) {
    case "LOAD_COMPONENT":
      return loadComponent(state, action);
    default:
      return state;
  }
}

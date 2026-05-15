export const initialItemsState = {
  items: [],
  total: 0,
  isLoading: false,
  error: null,
};

export function itemsReducer(state, action) {
  switch (action.type) {
    case 'request':
      return { ...state, isLoading: true, error: null };
    case 'success':
      return {
        items: action.payload.items,
        total: action.payload.total,
        isLoading: false,
        error: null,
      };
    case 'failure':
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}

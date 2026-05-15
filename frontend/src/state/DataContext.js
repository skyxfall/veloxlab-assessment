import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { fetchItemsPage } from '../services/items';
import { initialItemsState, itemsReducer } from './itemsReducer';

const ItemsStateContext = createContext(null);
const ItemsActionsContext = createContext(null);

function useFetchItemsAction(dispatch) {
  const requestIdRef = useRef(0);

  return useCallback(
    async (params = {}) => {
      const requestId = ++requestIdRef.current;
      dispatch({ type: 'request' });
      try {
        const data = await fetchItemsPage(params);
        if (requestId !== requestIdRef.current) return data;
        dispatch({ type: 'success', payload: data });
        return data;
      } catch (err) {
        if (err.name === 'AbortError') return null;
        if (requestId === requestIdRef.current) {
          dispatch({ type: 'failure', error: err });
        }
        throw err;
      }
    },
    [dispatch],
  );
}

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(itemsReducer, initialItemsState);
  const fetchItems = useFetchItemsAction(dispatch);
  const actions = useMemo(() => ({ fetchItems }), [fetchItems]);

  return (
    <ItemsActionsContext.Provider value={actions}>
      <ItemsStateContext.Provider value={state}>
        {children}
      </ItemsStateContext.Provider>
    </ItemsActionsContext.Provider>
  );
}

function useRequiredContext(context, name) {
  const value = useContext(context);
  if (!value) throw new Error(`${name} must be used within a DataProvider`);
  return value;
}

export const useItemsState = () => useRequiredContext(ItemsStateContext, 'useItemsState');
export const useItemsActions = () => useRequiredContext(ItemsActionsContext, 'useItemsActions');

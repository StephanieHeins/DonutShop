import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function TypeMenu() {
  const [state, dispatch] = useStoreContext();

  const {types} = state;

  const { loading, data: typeData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (typeData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: typeData.types,
      });
      typeData.types.forEach((type) => {
        idbPromise('types', 'put', type);
      });
    } else if (!loading) {
      idbPromise('types', 'get').then((types) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          types: types,
        });
      });
    }
  }, [typeData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentType: id,
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {types.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default TypeMenu;

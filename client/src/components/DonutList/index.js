import React, { useEffect } from 'react';
import DonutItem from '../DonutItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function DonutList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        donuts: data.donuts,
      });
      data.donuts.forEach((donut) => {
        idbPromise('donuts', 'put', donut);
      });
    } else if (!loading) {
      idbPromise('donuts', 'get').then((donuts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          donuts: donuts,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.donuts;
    }

    return state.donuts.filter(
      (donut) => donut.type_id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.donuts.length ? (
        <div className="flex-row">
          {filterProducts().map((donut) => (
            <DonutItem
              key={donut._id}
              _id={donut._id}
              image={donut.image}
              name={donut.name}
              price={donut.price}
              quantity={donut.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any donuts yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default DonutList;

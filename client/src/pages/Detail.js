import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import StarRating from '../components/StarRating';

import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise('cart', 'delete', { ...currentProduct });
  };


return (
    <>
  <div className="container">    

      {currentProduct && cart ? (
        <div>
          <Link to="/" className="mx-5">← Products</Link>
          
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              <div className="buttons is-centered">
                <button className="button is-primary"onClick={addToCart}>
                  Add to Cart
                </button>
                <button className="button is-danger"
                  disabled={!cart.find((p) => p._id === currentProduct._id)}
                  onClick={removeFromCart}
                >
                  Remove from Cart
                </button>
              </div>

          <div className="card">
            <header className="card-header">
              <p className="card-header-title is-size-4">
                {currentProduct.name}
              </p>
              <span>
                <p className="card-header-title is-size-4">
                  $ {currentProduct.price}{' '}
                </p>
              </span>
            </header>

            <div className="card-content">
              <div className="content">
                <p>{currentProduct.description}</p>
              </div>
            </div>

            <div className="card-image">
              <figure className="image is-256x256">
                <img
                  alt={currentProduct.name}
                  src={`/images/${currentProduct.image}`}
                />
              </figure>
            </div>
            </div>
          </div>
        </div>
          
        <div className="buttons is-centered"> 
          <StarRating/>
        </div>

          <ReviewForm productId = {currentProduct._id}/>

          <div className="columns">
            <div className="column is-half is-offset-one-quarter has-text-weight-bold">
              Reviews: 
            </div>
          </div>
          
          <ReviewList reviews = {currentProduct.reviews} />

      </div>

      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
      </div>
    </>
  );
}

export default Detail;

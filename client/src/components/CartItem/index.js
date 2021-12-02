import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {

  const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <div>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
          {item.name} - $ {item.price}
          </p>
        </header>

        <div class="card-image">
          <figure class="image is-4by3">
            <img 
              src={`/images/${item.image}`}
              alt=""
            />
          </figure>
        </div>

        <footer className="card-footer">
          <div className="card-footer-item">
            <span> 
              <div>Qty: {" "}</div>
              <input
                type="number"
                placeholder="1"
                value={item.purchaseQuantity}
                onChange={onChange}
              />
            </span>
          </div>
          <div 
            className="card-footer-item"
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}>
            🗑️
          </div>
        </footer>
      </div>
    </div>
  );
}

export default CartItem;
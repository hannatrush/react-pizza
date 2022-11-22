import React from 'react';
import cartEmptyImg from '../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';

const CartEmpty = () => {
  return (
    <>
        <div className="cart cart--empty">
            <h2>
            The cart is empty <span>😕</span>
            </h2>
            <p>
            You haven't chosen any pizza yet.
            <br />
            For ordering pizza please come back to the main page.
            </p>
            <img src={cartEmptyImg} alt="Empty cart" />
            <Link to="/" className="button button--black">
            <span>Come back</span>
            </Link>
        </div>
    </>
  )
}

export default CartEmpty;
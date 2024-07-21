// import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { productList } from './ProductItems';

const orderList = productList;

const OrderConfirmed = () => {
  const cartItem = useSelector((store: RootState) => store.cart);

  const getOrderedList = cartItem.map((cart) => {
    const productListItem = orderList.find((item) => item.name === cart.name);
    return productListItem ? { ...cart, ...productListItem } : cart;
  });

  console.log(getOrderedList);

  return (
    <section>
      <div>
        <span>
          <img
            src="/assets/images/icon-order-confirmed.svg"
            alt="order-confirmed"
          />
          <h2>Order Confirmed</h2>
          <p>We hope you enjoyed your food!</p>
        </span>
      </div>

      <div className="flex flex-col gap-5 px-5 py-8 bg-red-200 rounded-2xl">
        {getOrderedList.map((item, i) => (
          <>
            <article
              key={i}
              className="flex justify-between"
            >
              <div className="flex gap-5">
                <img
                  src={item.image.mobile}
                  alt={item.name}
                  className="w-[48px] h-[48px]"
                />
                <div>
                  <p>{item.name}</p>
                  <span className="flex gap-3">
                    <p>1x</p>
                    <p>$7.20</p>
                  </span>
                </div>
              </div>
              <h3>$42.00</h3>
            </article>
            <hr className="border-black" />
          </>
        ))}
      </div>

      <div></div>
    </section>
  );
};

export default OrderConfirmed;

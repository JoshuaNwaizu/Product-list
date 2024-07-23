// import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CartItem, deleteItem, openOrderItem } from '../features/productsSlice';
import { AppDispatch, RootState } from '../store';
// import { useState } from 'react';
import Button from './Button';

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cartItem = useSelector((store: RootState) => store.cart);

  const cartTotal = cartItem.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  const cartSummary = cartItem.reduce((total: number, item: CartItem) => {
    return total + item.quantity * item.price;
  }, 0);

  const handleOpenNav = () => {
    dispatch(openOrderItem());
  };

  console.log(cartItem);
  console.log(cartTotal);
  console.log(cartSummary);

  const handleDelete = (name: string, price: number) => {
    dispatch(deleteItem({ name, price }));
  };
  return (
    <div className="flex flex-col">
      <section className="flex flex-col gap-6 bg-[#fff] py-8 px-5  rounded-2xl  min-[1100px]:w-[350px]  min-[1100px]:mt-[1.5rem] ">
        <h1 className="text-[#C73B0F] text-[1.5rem] font-bold">
          Your Cart ({cartTotal})
        </h1>
        {cartItem.length > 0 ? (
          <>
            <div className="flex flex-col gap-2">
              {cartItem.map((item, i) => (
                <>
                  <div
                    key={i}
                    className="flex flex-row justify-between px-2 py-3"
                  >
                    <div className="flex flex-col justify-between gap-2">
                      {' '}
                      <span className="text-[#260F08] text-[.9rem] font-semibold">
                        {item.name}
                      </span>
                      <span className="flex flex-row gap-5">
                        <p className="text-[#C73B0F] text-[.9rem] font-semibold">
                          {item.quantity}x{' '}
                        </p>
                        <p className="flex gap-4">
                          <span>@{item.price.toFixed(2)}</span>
                          <span className="text-[#87635A] font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </p>
                      </span>
                    </div>

                    <button onClick={() => handleDelete(item.name, item.price)}>
                      <img
                        src="/assets/images/icon-remove-item.svg"
                        alt=""
                        className="border-2 border-[#87635A] rounded-full h-[24px] p-1"
                      />
                    </button>
                  </div>
                  <hr className="w-full" />
                </>
              ))}
            </div>
            <div className="flex flex-col gap-7 ">
              <h2 className="flex items-center justify-between px-2 ">
                <span className="text-[#260F08] text-[14px]">Order Total</span>
                <span className="text-[#260F08] text-[24px] font-bold">
                  ${cartSummary.toFixed(2)}
                </span>
              </h2>
              <span className="flex items-center justify-center gap-3 bg-[#FCF8F6] p-[16px] rounded-xl">
                <img
                  src="/assets/images/icon-carbon-neutral.svg"
                  alt="carbon-neutral"
                  className="w-[20px]"
                />
                <p>
                  This is <strong>carbon-neutral</strong> delivery.{' '}
                </p>
              </span>
            </div>
          </>
        ) : (
          <section className="flex flex-col items-center justify-center pb-5">
            <div className="w-[128px] h-[128px] ">
              <img
                src="/assets/images/illustration-empty-cart.svg"
                alt="Empty icon"
              />
            </div>
            <p className="text-[#87635A] font-semibold text-[14px]">
              Your added items will appear here
            </p>
          </section>
        )}
        {cartItem.length > 0 && (
          <Button
            text=" Confirm Order"
            className="bg-[#C73B0F] p-[1rem] font-semibold text-[16px] text-[#fff] rounded-[2rem]"
            onClick={handleOpenNav}
          />
        )}
      </section>
    </div>
  );
};

export default Cart;

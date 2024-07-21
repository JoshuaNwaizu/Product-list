// import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import productJson from '../data.json';
import {
  addCart,
  checkForActive,
  decrementItemQuantity,
  incrementItemQuantity,
} from '../features/productsSlice';
import { AppDispatch, RootState } from '../store';

export interface Image {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface FoodItem {
  image: Image;
  name: string;
  category: string;
  price: number;
  //  image: string;
}

export const productList: FoodItem[] = productJson;

const ProductItems = () => {
  const productItem = useSelector((store: RootState) => store);
  const cartCount = productItem.cart;
  console.log(cartCount);

  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (name: string, price: number) => {
    dispatch(addCart(name, price));
    dispatch(checkForActive(name, price));
  };

  const handleIncrement = (name: string, price: number) => {
    dispatch(incrementItemQuantity(name, price));
  };
  const handleDecrement = (name: string, price: number) => {
    dispatch(decrementItemQuantity(name, price));
  };

  return (
    <section>
      <h1 className="text-[2.6rem] font-bold">Desserts</h1>
      <article className="flex flex-col mt-8 gap-7">
        {productList.map((product) => {
          const cartItem = cartCount.find(
            (item) => item.name === product.name && item.price == product.price
          );
          const quantity = cartItem ? cartItem.quantity : 0;
          const isActive = cartItem ? cartItem.isActive : false;
          return (
            <div
              className="flex flex-col"
              key={product.name}
            >
              <img
                src={product.image.mobile}
                alt={product.name}
                className={`border-2 ${
                  isActive ? 'border-[#C73B0F] ' : ''
                } rounded-xl`}
              />
              <span className="flex justify-center">
                {' '}
                <span
                  className={` ${
                    isActive ? 'bg-[#C73B0F] px-4 ' : 'bg-[#fff]'
                  }  w-[11rem] py-4 px-6 border-[#C2B2A3] border-2 rounded-full -translate-y-8`}
                >
                  {!isActive ? (
                    <span
                      className="flex justify-center gap-3 "
                      onClick={() => handleClick(product.name, product.price)}
                    >
                      <img
                        src="/assets/images/icon-add-to-cart.svg"
                        alt="cart logo"
                      />
                      <h4 className="font-semibold text-[14px]">
                        {' '}
                        <span>Add to Cart</span>
                      </h4>
                    </span>
                  ) : (
                    <span className="flex items-center justify-between gap-3 -py-3">
                      <div
                        className="flex items-center justify-center border-2 border-[#fff] py-[.53rem] px-[.3rem] rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDecrement(product.name, product.price);
                        }}
                      >
                        <img
                          src="/assets/images/icon-decrement-quantity.svg"
                          alt="logo"
                          className="w-[10px]"
                        />
                      </div>
                      <p className="font-semibold text-[14px] text-[#fff]">
                        {quantity}
                      </p>
                      <div
                        className="flex items-center   py-[.3rem] px-[.3rem] "
                        onClick={(e) => {
                          e.stopPropagation();
                          handleIncrement(product.name, product.price);
                        }}
                      >
                        <img
                          src="/assets/images/icon-increment-quantity.svg"
                          alt="logo"
                          className="border-2 border-[#fff] h-[] p-1 rounded-full"
                        />
                      </div>
                    </span>
                  )}
                </span>
              </span>

              <p className="flex flex-col -mt-2">
                <span className="text-[14px] text-[#87635A]">
                  {product.category}
                </span>
                <span className="text-[16px] font-semibold text-[#260F08]">
                  {product.name}
                </span>
                <span className="text-[16px] text-[#C73B0F] font-semibold">
                  ${product.price.toFixed(2)}
                </span>
              </p>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default ProductItems;

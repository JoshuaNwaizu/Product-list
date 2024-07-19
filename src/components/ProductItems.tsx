// import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import productJson from '../data.json';
import { addCart, addCount } from '../features/productsSlice';
import { useState } from 'react';

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
}

const productList: FoodItem[] = productJson;

const ProductItems = () => {
  const [btnToggle, setBtnToggle] = useState<boolean>(false);

  const productItem = useSelector((store) => store);
  const cartCount = productItem.count;
  console.log(cartCount);

  const dispatch = useDispatch();

  const handleClick = (name: string, price: number) => {
    dispatch(addCart(name, price));
    setBtnToggle(true);
  };
  const handleAddCount = () => {
    dispatch(addCount());
  };
  return (
    <section>
      <h1
        onClick={handleAddCount}
        className="text-[2.6rem] font-bold"
      >
        Desserts
      </h1>
      <article className="flex flex-col mt-8 gap-7">
        {productList.map((product) => (
          <div
            className="flex flex-col"
            key={product.name}
          >
            <img
              src={product.image.mobile}
              alt={product.name}
              className="rounded-xl"
            />
            <span className="flex justify-center">
              {' '}
              <span
                className={` ${
                  btnToggle ? 'bg-[#C73B0F] px-4' : 'bg-[#fff]'
                }  w-[11rem] py-4 px-6 border-[#C2B2A3] border-2 rounded-full -translate-y-8`}
                onClick={() => handleClick(product.name, product.price)}
              >
                {!btnToggle ? (
                  <span className="flex justify-center gap-3 ">
                    <img
                      src="/assets/images/icon-add-to-cart.svg"
                      alt="cart logo"
                    />
                    <p className="font-semibold text-[14px]">
                      {' '}
                      <h4>Add to Cart</h4>{' '}
                    </p>
                  </span>
                ) : (
                  <span className="flex justify-between gap-3 items-center  ">
                    <div className="flex items-center border-2 border-[#fff] py-[.53rem] px-[.3rem] rounded-full">
                      <img
                        src="/assets/images/icon-decrement-quantity.svg"
                        alt="logo"
                      />
                    </div>
                    <p className="font-semibold text-[14px] text-[#fff]">1</p>
                    <div className="flex items-center  border-2 border-[#fff] py-[.3rem] px-[.3rem] rounded-full">
                      <img
                        src="/assets/images/icon-increment-quantity.svg"
                        alt="logo"
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
        ))}
      </article>
    </section>
  );
};

export default ProductItems;

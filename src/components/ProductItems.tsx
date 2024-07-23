import { useDispatch, useSelector } from 'react-redux';
import productJson from '../data.json';
import {
  addCart,
  activeItem,
  decrementItem,
  incrementItem,
} from '../features/productsSlice';
import { AppDispatch, RootState } from '../store';
import React, { useEffect, useState } from 'react';

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

export const productList: FoodItem[] = productJson;

const ProductItems: React.FC = () => {
  const [imgSrc, setImgSrc] = useState(window.innerWidth > 600);
  const cartCount = useSelector((store: RootState) => store.cart);
  console.log(cartCount);

  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (name: string, price: number) => {
    dispatch(addCart({ name, price }));
    dispatch(activeItem({ name, price }));
  };

  const handleIncrement = (name: string, price: number) => {
    dispatch(incrementItem({ name, price }));
  };
  const handleDecrement = (name: string, price: number) => {
    dispatch(decrementItem({ name, price }));
  };

  useEffect(() => {
    const handleResizeImg = () => {
      setImgSrc(window.innerWidth > 600);
    };
    window.addEventListener('resize', handleResizeImg);
  }, []);
  return (
    <section>
      <h1 className="text-[2.6rem] font-bold">Desserts</h1>
      <article className="flex flex-col mt-8 gap-7 min-[600px]:flex-row min-[600px]:justify-center max-w-[900px] flex-wrap ">
        {productList.map((product) => {
          const cartItem = cartCount.find(
            (item) => item.name === product.name && item.price == product.price
          );
          const quantity = cartItem ? cartItem.quantity : 0;
          const isActive = cartItem ? cartItem.isActive : false;
          return (
            <div
              className="flex flex-col min-[600px]:w-[200px] min-[820px]:w-[230px] "
              key={product.name}
            >
              <img
                src={imgSrc ? product.image.tablet : product.image.mobile}
                alt={product.name}
                className={`border-2 ${
                  isActive ? 'border-[#C73B0F] ' : ''
                } rounded-xl transition-all duration-200 `}
              />
              <span className="flex justify-center">
                {' '}
                <span
                  className={` ${
                    isActive ? 'bg-[#C73B0F] px-4 ' : 'bg-[#fff]'
                  }  w-[11rem] py-4 px-6 border-[#C2B2A3] border-2 rounded-full -translate-y-8 transition-all duration-200`}
                >
                  {!isActive ? (
                    <span
                      className="flex justify-center gap-3 cursor-pointer"
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
                        className="flex items-center justify-center border-2 border-[#fff] py-[.53rem] px-[.3rem] rounded-full cursor-pointer"
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
                        className="flex items-center   py-[.3rem] px-[.3rem] cursor-pointer "
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

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
  const [imgSrc, setImgSrc] = useState<'desktop' | 'tablet' | 'mobile'>(
    window.innerWidth > 1000
      ? 'desktop'
      : window.innerWidth > 600
      ? 'tablet'
      : 'mobile'
  );
  const cartCount = useSelector((store: RootState) => store.cart);

  const dispatch = useDispatch<AppDispatch>();

  const handleAddItem = (name: string, price: number) => {
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
      if (window.innerWidth > 1100) {
        setImgSrc('desktop');
      } else if (window.innerWidth > 600) {
        setImgSrc('tablet');
      } else {
        setImgSrc('mobile');
      }
    };
    window.addEventListener('resize', handleResizeImg);
  }, []);

  return (
    <section id="product-items">
      <h1 className="text-[2.6rem] font-bold min-[800px]:mx-8 min-[1150px]:mx-4 max-[600px]:flex  max-[600px]:justify-between items-center">
        <span>Desserts</span>

        <span className=" min-[600px]:hidden">
          <a href="#cart">
            <img
              src="/assets/images/icon-add-to-cart.svg"
              className="h-[25px]"
            />
          </a>
        </span>
      </h1>
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
                src={product.image[imgSrc]}
                alt={product.name}
                className={`border-2 ${
                  isActive ? 'border-[#C73B0F] ' : ''
                } rounded-xl transition-all duration-200 hover:'border-[#C73B0F] '`}
              />
              <span className="flex justify-center ">
                <span
                  className={` ${
                    isActive ? 'bg-[#C73B0F] px-4 ' : 'bg-[#fff]'
                  }  w-[11rem] py-4 px-5 hover:border-[#C73B0F] border-[#C2B2A3] border-2 cursor-pointer rounded-full -translate-y-8 transition-all duration-200`}
                >
                  {!isActive ? (
                    <span
                      className="flex justify-center gap-3 "
                      onClick={() => handleAddItem(product.name, product.price)}
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
                    <span className="flex items-center justify-between gap-3 font-semibold -my-1 min-[800px]:-mx-1">
                      <div
                        className="flex items-center justify-center  cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDecrement(product.name, product.price);
                        }}
                      >
                        <p className="flex items-center justify-center border-2 border-[#fff]  px-[.5rem] text-[16px] text-white rounded-full">
                          -
                        </p>
                      </div>
                      <p className="font-semibold text-[14px] text-[#fff]">
                        {quantity}
                      </p>
                      <div
                        className="flex items-center justify-center  py-[.3rem] px-[.3rem] cursor-pointer "
                        onClick={(e) => {
                          e.stopPropagation();
                          handleIncrement(product.name, product.price);
                        }}
                      >
                        <p className="border-2 border-[#fff] px-[.41rem] flex items-center justify-center rounded-full text-white">
                          +
                        </p>
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

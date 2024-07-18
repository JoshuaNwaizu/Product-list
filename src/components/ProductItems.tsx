// import React from 'react'
import { useSelector, UseSelector } from 'react-redux';
import productJson from '../data.json';

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
  const productItem = useSelector((store) => store);

  console.log(productItem);
  // console.log(productItem.count);
  return (
    <section>
      <h1 className="text-[2.6rem] font-bold">Desserts</h1>
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
              <span className="flex justify-center gap-3 bg-[#fff] w-[12rem] py-4 px-6 border-[#C2B2A3] border-2 rounded-full -translate-y-8">
                <img
                  src="/assets/images/icon-add-to-cart.svg"
                  alt="cart logo"
                />
                <p className="font-semibold text-[14px]">Add to Cart</p>
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

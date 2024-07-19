// import React from 'react'
import { useSelector } from 'react-redux';

const Cart = () => {
  const productItem = useSelector((store) => store);
  const cartItem = productItem.cart;
  console.log(productItem.cart);

  // console.log(productItem);
  return (
    <>
      {cartItem.length > 0 && (
        <section className="flex flex-col gap-6 bg-[#fff] py-8 px-5 rounded-2xl">
          <h1 className="text-[#C73B0F] text-[1.5rem] font-bold">
            Your Cart ({cartItem.length})
          </h1>
          <div className="flex flex-col gap-2">
            {cartItem.map((item) => (
              <>
                <div
                  key={item.name}
                  className="flex flex-row justify-between py-3 px-2"
                >
                  <div className="flex flex-col justify-between gap-2">
                    {' '}
                    <span className="text-[#260F08] text-[.9rem] font-semibold">
                      {item.name}
                    </span>
                    <span className="flex flex-row gap-5">
                      <p className="text-[#C73B0F] text-[.9rem] font-semibold">
                        1x{' '}
                      </p>
                      <p className="flex gap-4">
                        <span>@{item.price.toFixed(2)}</span>
                        <span className="text-[#87635A] font-semibold">
                          ${item.price.toFixed(2)}
                        </span>
                      </p>
                    </span>
                  </div>

                  <button>X</button>
                </div>
                <hr className="w-full" />
              </>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;

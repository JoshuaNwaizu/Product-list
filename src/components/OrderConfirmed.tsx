import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { productList } from './ProductItems';
import Button from './Button';
import { CartItem, openOrderItem, resetItem } from '../features/productsSlice';

const orderList = productList;

const OrderConfirmed: React.FC = () => {
  const cartItem = useSelector((store: RootState) => store.cart);
  const isOrderOpen = useSelector((store: RootState) => store.openOrder);
  const dispatch = useDispatch<AppDispatch>();

  const getOrderedList = cartItem.map((cart) => {
    const productListItem = orderList.find((item) => item.name === cart.name);
    return productListItem ? { ...cart, ...productListItem } : cart;
  });
  const orderSummary = getOrderedList.reduce(
    (total: number, item: CartItem): number => {
      return total + item.quantity * item.price;
    },
    0
  );

  const handleReset = () => {
    dispatch(resetItem());
  };

  const handleOpenNav = () => {
    dispatch(openOrderItem());
  };

  return (
    <section className="">
      <div
        className={` ${
          isOrderOpen ? 'bg-[#1e1d1dac] fixed left-0 top-0 h-svh w-svw' : ''
        }`}
        onClick={handleOpenNav}
      ></div>
      <section
        className={`fixed  ${
          isOrderOpen
            ? 'bottom-0 min-[820px]:bottom-[12rem]  min-[1100px]:bottom-[1rem] min-[1320px]:bottom-[6rem] min-[1280px]:bottom-[6rem] '
            : 'bottom-[-1000%]'
        } flex left-0 right-0 min-[820px]:left-[6rem] min-[1100px]:left-[25rem] min-[1100px]:right-[25rem]   min-[1320px]:right-[27rem] min-[1320px]:left-[27rem] min-[820px]:right-[6rem] flex-col gap-5 px-4 min-[820px]:px-9 py-6 bg-white rounded-t-[2rem] min-[820px]:rounded-[2rem] text-[#260F08] transition-all  max-[320px]:h-svh h-[80svh] min-[820px]:h-[700px] min-[1100px]:h-[600px] min-[1280px]:h-[500px] duration-300 max-[320px]:rounded-none
      `}
      >
        <div>
          <img
            src="/assets/images/icon-order-confirmed.svg"
            alt="order-confirmed"
            className="h-[48px] mb-3"
          />
          <span className="flex flex-col gap-3">
            <h2 className="text-[#260F08] text-[40px] font-bold leading-[45px] max-[320px]:text-[33px]">
              Order <br className=" max-[320px]:hidden min-[820px]:hidden" />
              Confirmed
            </h2>
            <p className="text-[16px] text-[#87635A]">
              We hope you enjoyed your food!
            </p>
          </span>
        </div>

        <div className="flex flex-col gap-5 px-5 max-[320px]:px-3 py-8  bg-[#FCF8F6] max-h-[320px] min-[820px]:max-h-[360px] h-[350px] min-[820px]:h-[360px] overflow-y-scroll rounded-2xl">
          {getOrderedList.map((item, i) => (
            <>
              <article
                key={i}
                className="flex justify-between"
              >
                <div className="flex gap-5">
                  {item.image && (
                    <img
                      src={item.image.thumbnail}
                      alt={item.name}
                      className="w-[48px] h-[48px] rounded-xl"
                    />
                  )}
                  <div className="flex flex-col gap-1">
                    <p className="text-[14px] font-semibold text-[#260F08]">
                      {item.name.length < 17
                        ? item.name
                        : `${item.name.slice(0, 19)}...`}
                    </p>
                    <span className="flex items-center gap-3 text-[14px]">
                      <p className=" text-[#C73B0F] font-semibold">
                        {item.quantity}x
                      </p>
                      <p className="text-[#87635A]">@{item.price.toFixed(2)}</p>
                    </span>
                  </div>
                </div>
                <h3 className="text-[16px] font-semibold">
                  ${(item.quantity * item.price).toFixed(2)}
                </h3>
              </article>
              <hr />
            </>
          ))}
          <div>
            <p className="flex justify-between">
              <span>Order Total</span>
              <span className="font-bold text-[24px]">
                ${orderSummary.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
        <Button
          text="Start New Order"
          className="bg-[#C73B0F] p-[1rem] font-semibold text-[16px] text-[#fff] rounded-[2rem] text-center w-full hover:bg-[#571e0d] transition-all duration-200"
          onClick={handleReset}
        />
      </section>
    </section>
  );
};

export default OrderConfirmed;

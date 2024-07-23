import Cart from './components/Cart';
import OrderConfirmed from './components/OrderConfirmed';
import ProductItems from './components/ProductItems';

const App = () => {
  return (
    <main className="max-w-[1150px] mx-6 my-[3rem] flex flex-col gap-6 min-[1150px]:mx-auto">
      <div className="flex flex-col min-[1100px]:flex-row min-[1100px]: gap-6">
        <ProductItems />
        <Cart />
      </div>

      <OrderConfirmed />
    </main>
  );
};

export default App;

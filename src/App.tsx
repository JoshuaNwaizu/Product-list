import Cart from './components/Cart';
import OrderConfirmed from './components/OrderConfirmed';
import ProductItems from './components/ProductItems';

const App = () => {
  return (
    <main className="max-w-[1024px] mx-6 my-[3rem] flex flex-col gap-6">
      <ProductItems />
      <Cart />
      <OrderConfirmed />
    </main>
  );
};

export default App;

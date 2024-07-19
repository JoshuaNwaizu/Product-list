import Cart from './components/Cart';
import ProductItems from './components/ProductItems';

const App = () => {
  return (
    <main className="max-w-[1024px] mx-6 my-[3rem] flex flex-col gap-6">
      <ProductItems />
      <Cart />
    </main>
  );
};

export default App;

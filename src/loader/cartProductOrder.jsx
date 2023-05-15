import { getShoppingCart } from "../Components/FakeDB/FakeDB";

const cartProductOrder = async () => {
  const storedCart = getShoppingCart();
  const ids = Object.keys(storedCart);
  const loaderProducts = await fetch(
    "https://ema-jhon-server-two.vercel.app/productsByIds",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    }
  );
  const products = await loaderProducts.json();
  console.log(products);
  const savedCart = [];
  // console.log(storedCart);
  for (let id in storedCart) {
    const addedProduct = products.find((product) => product._id === id);
    if (addedProduct) {
      const quantity = storedCart[id];
      addedProduct.quantity = quantity;
      savedCart.push(addedProduct);
    }
  }
  return savedCart;
};

export default cartProductOrder;

import { getShoppingCart } from "../Components/FakeDB/FakeDB";

const cartProductOrder = async () => {
  const loaderProducts = await fetch("products.json");
  const products = await loaderProducts.json();
  // console.log(products);
  const savedCart = [];
  const storedCart = getShoppingCart()
  // console.log(storedCart);
  for(let id in storedCart) {
    const addedProduct = products.find(product=>product.id === id);
    if(addedProduct){
      const quantity = storedCart[id];
      addedProduct.quantity = quantity;
      savedCart.push(addedProduct);
    }
  }
  return savedCart;
};

export default cartProductOrder;

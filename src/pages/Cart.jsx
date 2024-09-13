import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import productData from "../data/productData";

function getCookieProducts(cartData) {
  let products = [];
  cartData.forEach(cartItem => {
    const currentCategory = productData.categories.find(item => item.id === cartItem.category);
    const currentProduct = currentCategory.products.find(item => item.id === cartItem.product);
    products.push({...currentProduct, count: cartItem.count});
  });
  return products;
}

function getOrderSummary(products) {
  let total = 0;
  products.forEach(product => {
    const price = product.price.replace('$','');
    total += parseFloat(price * product.count);
  });
  const shipping = (total > 100 || total <= 0) ? 0 : 20;
  const tax = total * 0.1;
  const orderTotal = total + shipping + tax;
  return {
    total: `$${total.toFixed(2)}`,
    shipping: `$${shipping}`,
    tax: `$${tax.toFixed(2)}`,
    orderTotal: `$${orderTotal.toFixed(2)}`
  }
}

function Cart() {
    const [cookies, setCookie] = useCookies(['cart']);
    const products = getCookieProducts(cookies.cart);
    const { total, shipping, tax, orderTotal} = getOrderSummary(products);

    function removeProduct(index) {
      const cookieData = cookies.cart;
      cookieData.splice(index, 1);
      setCookie('cart', cookieData);
    }

    return (
        <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
      <ol role="list" className="flex items-center space-x-4 py-8">
            <li>
                <div className="flex items-center">
                    <Link to="/" className="mr-4 text-sm font-medium text-gray-900">
                        Home
                    </Link>
                    <svg viewBox="0 0 6 20" aria-hidden="true" className="h-5 w-auto text-gray-300">
                        <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                    </svg>
                </div>
            </li>
            <li className="text-sm">
                <Link to="/cart" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                    Cart
                </Link>
            </li>
            
        </ol>
      <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
          <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>

          <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
            {
              products.map((product, index) => (
                  <li key={`${product.id}-${index}`} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img src={product.imageSrc} alt={product.name} className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48" />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a href="#" className="font-medium text-gray-700 hover:text-gray-800">{product.name}</a>
                          </h3>
                        </div>
                        
                        <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor="quantity-0" className="sr-only">Quantity, Basic Tee</label>
                        <select defaultValue={product.count || 1} id="quantity-0" name="quantity-0" className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                        </select>

                        <div className="absolute right-0 top-0">
                          <button onClick={() => removeProduct(index)} type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Remove</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
  </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      
  {
    product.inStock ? (<>
        <svg className="h-5 w-5 flex-shrink-0 text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"></path>
      </svg>
      <span>In stock</span>
    </>) : (
      <>
        <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
        </svg>
      <span>Not in stock</span>
      </>
      )
  }
                      
                    </p>
                  </div>
                </li>
              ))
            }
          </ul>
        </section>

       
        <section aria-labelledby="summary-heading" className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
          <h2 id="summary-heading" className="text-lg font-medium text-gray-900">Order summary</h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">{total}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex items-center text-sm text-gray-600">
                <span>Shipping estimate</span>
                <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Learn more about how shipping is calculated</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
</svg>
                </a>
              </dt>
              <dd className="text-sm font-medium text-gray-900">{shipping}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex text-sm text-gray-600">
                <span>Tax estimate</span>
                <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Learn more about how tax is calculated</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
</svg>
                </a>
              </dt>
              <dd className="text-sm font-medium text-gray-900">{tax}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">Order total</dt>
              <dd className="text-base font-medium text-gray-900">{orderTotal}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <button disabled={total === '$0.00'} type="submit" className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-50">Checkout</button>
          </div>
        </section>
      </form>

     
      <section aria-labelledby="related-heading" className="mt-24">
        <h2 id="related-heading" className="text-lg font-medium text-gray-900">You may also like…</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-related-product-01.jpg" alt="Front of Billfold Wallet in natural leather." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      Billfold Wallet
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Natural</p>
                </div>
                <p className="text-sm font-medium text-gray-900">$118</p>
              </div>
            </div>
          <div className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-related-product-02.jpg" alt="Black machined pen and pencil with hexagonal shaft and small white logo." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      Machined Pen and Pencil Set
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Black</p>
                </div>
                <p className="text-sm font-medium text-gray-900">$70</p>
              </div>
            </div>
          <div className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-related-product-03.jpg" alt="Three mini sketchbooks with tan and charcoal typography poster covers." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      Mini Sketchbook Set
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Tan and Charcoal</p>
                </div>
                <p className="text-sm font-medium text-gray-900">$28</p>
              </div>
            </div>
          <div className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-related-product-04.jpg" alt="Grooved walnut desk organizer base with five modular white plastic organizer trays." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      Organize Set
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Walnut</p>
                </div>
                <p className="text-sm font-medium text-gray-900">$149</p>
              </div>
            </div>
          
        </div>
      </section>
    </main>
    )
}
export default Cart;
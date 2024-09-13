import { StarIcon } from '@heroicons/react/20/solid'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie';

import productData from '../data/productData';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Product() {
  const [cookies, setCookie] = useCookies(['cart']);

  const { category, product } = useParams();
  const navigate = useNavigate();

  const currentCategory = productData.categories.find(item => item.id === category);
  const products = currentCategory?.products;
  const currentProduct = products.find(item => item.id == product);

  function addToCart() {
    const cartValue = cookies.cart ? JSON.parse(cookies.cart) : [];
    setCookie('cart', JSON.stringify([...cartValue, {category: currentCategory.id, product: currentProduct.id}])  )
    navigate("/cart");
  }

  return (
    <div className="bg-white">
      <div className="pb-16 pt-6 sm:pb-24">
        <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{currentProduct.name}</h1>

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
            <li>
                <div className="flex items-center">
                    <Link to={`/categories/${currentCategory.id}`} className="mr-4 text-sm font-medium text-gray-900">
                      {currentCategory.category}
                    </Link>
                    <svg viewBox="0 0 6 20" aria-hidden="true" className="h-5 w-auto text-gray-300">
                        <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                    </svg>
                </div>
            </li>
            <li className="text-sm">
                <Link to={`/categories/${currentCategory.id}/products/${currentProduct.id}`} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                    {currentProduct.name}
                </Link>
            </li>
        </ol>
        </nav>
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">{currentProduct.name}</h1>
                <p className="text-xl font-medium text-gray-900">{currentProduct.price}</p>
              </div>
              {/* Reviews */}
              <div className="mt-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    {currentProduct.rating}
                    <span className="sr-only"> out of 5 stars</span>
                  </p>
                  <div className="ml-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          currentProduct.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0',
                        )}
                      />
                    ))}
                  </div>
                  <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                    ·
                  </div>
                  <div className="ml-4 flex">
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      See all {currentProduct.reviewCount || 0} reviews
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Images</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                  <img
                    alt={currentProduct.imageAlt}
                    src={currentProduct.imageSrc}
                    className={classNames(
                      'lg:col-span-2 lg:row-span-2',
                      'rounded-lg',
                    )}
                  />
                
              </div>
            </div>

            <div className="mt-8 lg:col-span-5">
              <form>
                <button
                  type="submit"
                  onClick={addToCart}
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to cart
                </button>
              </form>

              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Description</h2>

                <div
                  dangerouslySetInnerHTML={{ __html: currentProduct.description || '-' }}
                  className="prose prose-sm mt-4 text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

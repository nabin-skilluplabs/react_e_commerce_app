import { Link, useParams } from "react-router-dom"
import productData from "../data/productData";


export default function CategoryProducts() {
    const { category } = useParams();
    const currentCategory = productData.categories.find(item => item.id === category);
    
    const products = currentCategory?.products    ;
    
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">New Arrivals</h1>

                <ol role="list" className="flex items-center space-x-4 py-8">
                    <li >
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
                        <Link to="/categories" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                            New Arrivals
                        </Link>
                    </li>
                </ol>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products && products.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    alt={product.imageAlt}
                                    src={product.imageSrc}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <Link to="/product">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

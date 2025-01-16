import { NavLink } from "react-router-dom"

function ProductCard({product}) {
 
  
  
  return (
       <>
       

<div
      key={product.id}
      style={{
        flex: '0 1 calc(20% - 15px)', // 5 products per row, adjust as needed
        boxSizing: 'border-box',
        maxWidth: '220px', // Reduced the max width for smaller cards
      }}
      className="bg-gray-100 border border-gray-300 rounded-lg shadow text-black"
    >
      <a href="#">
        <img className="p-4 rounded-t-lg" src={product.image} alt="product" style={{ maxHeight: '150px', objectFit: 'contain' }} />
      </a>
      <div className="px-4 pb-4">
        <a href="#">
          <h5 className="text-lg font-semibold tracking-tight text-gray-900 truncate">{product.title}</h5>
        </a>
        <div className="flex items-center mt-2 mb-4">
          <svg
            className="w-4 h-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">5.0</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">${product.price}</span>
          <NavLink className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          to={`/products/details/${product.id}`}>
           View
          </NavLink>
        </div>
      </div>
    </div>

       </>
  )
}

export default ProductCard
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductCard from './ProductCard'

function ProductGrid({ products }) {
  const { isInWishlist, toggleWishlist } = useContext(ShopContext)
  if (products.length === 0) {
    return (
      <div className="dm-empty-state text-center">
        <i className="bi bi-search" aria-hidden="true"></i>
        <h2>Produk tidak ditemukan</h2>
        <p>Coba kata kunci lain atau gunakan tombol Reset Filter di atas.</p>
      </div>
    )
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
      {products.map((product) => (
        <div className="col" key={product.id}>
          <ProductCard product={product} isWishlisted={isInWishlist(product.id)} onToggleWishlist={toggleWishlist} />
        </div>
      ))}
    </div>
  )
}

export default ProductGrid

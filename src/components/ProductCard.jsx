import { Link } from 'react-router-dom'

function ProductCard({ product, isWishlisted, onToggleWishlist }) {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(product.price)

  return (
    <article className="dm-product-card h-100">
      <div className="dm-product-image-wrap">
        <Link to={`/product/${product.id}`} className="dm-product-image-link" aria-label={`Lihat detail ${product.name}`}>
          <img src={product.image} alt={`Pratinjau ${product.name}`} className="dm-product-image" loading="lazy" />
        </Link>
        <button
          type="button"
          className={`dm-wishlist-button ${isWishlisted ? 'is-active' : ''}`}
          aria-label={isWishlisted ? `Hapus ${product.name} dari wishlist` : `Tambah ${product.name} ke wishlist`}
          aria-pressed={isWishlisted}
          title={isWishlisted ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist'}
          onClick={() => onToggleWishlist(product.id)}
        >
          <i className={`bi ${isWishlisted ? 'bi-heart-fill' : 'bi-heart'}`} aria-hidden="true"></i>
        </button>
      </div>

      <div className="dm-product-body">
        <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
          <span className="dm-product-category">{product.category}</span>
          <span className="dm-product-format">{product.fileFormat}</span>
        </div>

        <h3 className="dm-product-title">{product.name}</h3>

        <div className="dm-product-bottom mt-auto">
          <span className="dm-product-price">{formattedPrice}</span>
          <Link to={`/product/${product.id}`} className="dm-product-detail-link">
            Lihat Detail
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProductCard

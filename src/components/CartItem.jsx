import { Link } from 'react-router-dom'

function CartItem({ product, onRemove }) {
  const price = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(product.price)

  return (
    <article className="dm-cart-item">
      <Link to={`/product/${product.id}`} className="dm-cart-item-image-link" aria-label={`Lihat ${product.name}`}>
        <img src={product.image} alt={`Pratinjau ${product.name}`} className="dm-cart-item-image" />
      </Link>

      <div className="dm-cart-item-info">
        <span className="dm-cart-item-category">{product.category}</span>
        <h2><Link to={`/product/${product.id}`}>{product.name}</Link></h2>
        <span className="dm-cart-item-format">Format: {product.fileFormat}</span>
        <strong className="dm-cart-item-price">{price}</strong>
      </div>

      <button
        type="button"
        className="dm-cart-remove"
        aria-label={`Hapus ${product.name} dari keranjang`}
        onClick={() => onRemove(product.id)}
      >
        <i className="bi bi-trash3" aria-hidden="true"></i>
        <span>Hapus</span>
      </button>
    </article>
  )
}

export default CartItem

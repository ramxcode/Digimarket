import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import products from '../data/products.json'
import NotFound from './NotFound'

function ProductDetail() {
  const { id } = useParams()
  const { addToCart, isInCart } = useContext(ShopContext)
  const product = products.find((item) => String(item.id) === id)

  if (!product) {
    return <NotFound />
  }

  const alreadyInCart = isInCart(product.id)

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(product.price)

  return (
    <section className="dm-detail-page">
      <div className="container">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="breadcrumb dm-detail-breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/products">Katalog</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="row g-4 g-lg-5 align-items-start">
          <div className="col-lg-6">
            <div className="dm-detail-image-panel">
              <img
                src={product.image}
                alt={`Pratinjau ${product.name}`}
                className="dm-detail-image"
              />
              <div className="dm-detail-image-caption">
                <i className="bi bi-image" aria-hidden="true"></i>
                Pratinjau produk digital
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="dm-detail-info">
              <span className="dm-detail-category">{product.category}</span>
              <h1 className="dm-detail-title">{product.name}</h1>
              <p className="dm-detail-lead">{product.description}</p>

              <div className="dm-detail-price-block">
                <span className="dm-detail-overline">Harga produk</span>
                <strong className="dm-detail-price">{formattedPrice}</strong>
              </div>

              <div className="dm-detail-description">
                <h2>Tentang produk</h2>
                <p>{product.longDescription}</p>
              </div>

              <div className="dm-detail-file">
                <div className="dm-detail-file-icon">
                  <i className="bi bi-file-earmark" aria-hidden="true"></i>
                </div>
                <div>
                  <span>Format file</span>
                  <strong>{product.fileFormat}</strong>
                </div>
              </div>

              <div className="dm-detail-actions">
                <button
                  type="button"
                  className="btn dm-btn-primary"
                  disabled={alreadyInCart}
                  onClick={() => addToCart(product.id)}
                >
                  <i className={`bi ${alreadyInCart ? 'bi-check2' : 'bi-bag-plus'}`} aria-hidden="true"></i>
                  {alreadyInCart ? 'Sudah di Keranjang' : 'Tambah ke Keranjang'}
                </button>
                {alreadyInCart && (
                  <Link to="/cart" className="btn dm-btn-secondary">
                    <i className="bi bi-bag" aria-hidden="true"></i>
                    Lihat Keranjang
                  </Link>
                )}
                <Link to="/products" className="btn dm-btn-secondary">
                  <i className="bi bi-arrow-left" aria-hidden="true"></i>
                  Kembali ke Katalog
                </Link>
              </div>
              <p className="dm-detail-helper" aria-live="polite">{alreadyInCart ? 'Produk ini sudah tersimpan di keranjang.' : 'Setiap produk digital hanya dapat ditambahkan satu kali.'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail

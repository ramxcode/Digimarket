import { Link } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import products from '../data/products.json'

const categories = [
  { name: 'Template Website', icon: 'bi-window' },
  { name: 'UI Kit', icon: 'bi-grid-1x2' },
  { name: 'E-book', icon: 'bi-book' },
  { name: 'Icon Pack', icon: 'bi-bounding-box' },
  { name: 'Template Presentasi', icon: 'bi-easel2' },
  { name: 'Template CV', icon: 'bi-file-earmark-person' },
  { name: 'Ilustrasi Digital', icon: 'bi-palette' },
]

function Home() {
  const featuredProducts = products.filter((product) => product.featured).slice(0, 8)

  return (
    <>
      <section className="dm-home-banner-section">
        <div className="container">
          <div className="dm-home-billboard">
            <img
              className="dm-home-billboard-image"
              src="/images/digimarket-banner.webp"
              alt="Ilustrasi laptop dengan template website, buku desain, dan aset kreatif digital"
              fetchPriority="high"
            />
            <div className="dm-home-billboard-overlay" aria-hidden="true"></div>
            <div className="dm-home-billboard-content">
              <h1>Temukan Produk Digital untuk Ide Hebatmu.</h1>
              <p>
                Jelajahi template, desain, e-book, dan berbagai aset digital untuk kebutuhan kreatifmu.
              </p>
              <Link to="/products" className="btn dm-home-billboard-button">
                Jelajahi Produk
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="dm-home-section dm-category-section">
        <div className="container">
          <div className="d-flex align-items-end justify-content-between gap-3 mb-4">
            <div className="dm-section-heading">
              <h2>Kategori Produk</h2>
              <p>Pilih jenis produk digital yang kamu butuhkan.</p>
            </div>
            <Link to="/products" className="dm-text-link dm-category-all">
              Semua produk <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>

          <div className="row g-2 g-sm-3">
            {categories.map((category) => (
              <div className="col-6 col-sm-4 col-lg-3 col-xl" key={category.name}>
                <Link
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  className="dm-category-link h-100"
                >
                  <i className={`bi ${category.icon}`} aria-hidden="true"></i>
                  <span>{category.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dm-home-section dm-featured-section">
        <div className="container">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-3 mb-4">
            <div className="dm-section-heading">
              <h2>Produk Unggulan</h2>
              <p>Temukan aset digital untuk proyek dan karya berikutnya.</p>
            </div>
            <Link to="/products" className="dm-text-link">
              Lihat Semua Produk <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      <section className="dm-home-cta-section">
        <div className="container">
          <div className="dm-home-cta">
            <div className="dm-home-cta-icon" aria-hidden="true">
              <i className="bi bi-bag-check"></i>
            </div>
            <div className="dm-home-cta-copy">
              <h2>Masih mencari aset yang tepat?</h2>
              <p>Lihat seluruh koleksi produk digital DigiMarket.</p>
            </div>
            <Link to="/products" className="btn dm-home-cta-button">
              Lihat Semua Produk <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home

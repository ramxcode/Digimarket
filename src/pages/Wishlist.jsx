import { useContext } from 'react'
import { Link } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import { ShopContext } from '../context/ShopContext'

function Wishlist() {
  const { wishlistItems } = useContext(ShopContext)

  return (
    <section className="dm-shop-page">
      <div className="container">
        <div className="dm-page-heading">
          <h1>Wishlist Saya</h1>
          <p>Produk yang kamu simpan untuk dilihat atau dibeli nanti.</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="dm-shop-empty text-center">
            <i className="bi bi-heart" aria-hidden="true"></i>
            <h2>Wishlist masih kosong</h2>
            <p>Tekan ikon hati pada kartu produk untuk menyimpannya di sini.</p>
            <Link to="/products" className="btn dm-btn-primary mt-3">Jelajahi Produk</Link>
          </div>
        ) : (
          <>
            <p className="dm-shop-count mb-4">{wishlistItems.length} produk tersimpan</p>
            <ProductGrid products={wishlistItems} />
          </>
        )}
      </div>
    </section>
  )
}

export default Wishlist

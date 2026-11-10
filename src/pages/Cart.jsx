import { useContext } from 'react'
import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import { ShopContext } from '../context/ShopContext'

function Cart() {
  const { cartItems, cartTotal, removeFromCart } = useContext(ShopContext)
  const formattedTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(cartTotal)

  return (
    <section className="dm-shop-page">
      <div className="container">
        <div className="dm-page-heading">
          <h1>Keranjang Belanja</h1>
          <p>Periksa produk digital yang ingin kamu beli sebelum checkout.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="dm-shop-empty text-center">
            <i className="bi bi-bag" aria-hidden="true"></i>
            <h2>Keranjang masih kosong</h2>
            <p>Belum ada produk yang kamu tambahkan ke keranjang.</p>
            <Link to="/products" className="btn dm-btn-primary mt-3">Jelajahi Produk</Link>
          </div>
        ) : (
          <div className="row g-4 align-items-start">
            <div className="col-lg-8">
              <div className="dm-cart-list">
                <div className="dm-cart-list-title">Produk dipilih <span>({cartItems.length})</span></div>
                {cartItems.map((product) => (
                  <CartItem key={product.id} product={product} onRemove={removeFromCart} />
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <aside className="dm-cart-summary">
                <h2>Ringkasan Belanja</h2>
                <div className="dm-cart-summary-line">
                  <span>Jumlah produk</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="dm-cart-summary-line">
                  <span>Subtotal</span>
                  <span>{formattedTotal}</span>
                </div>
                <div className="dm-cart-summary-total">
                  <span>Total</span>
                  <strong>{formattedTotal}</strong>
                </div>
                <Link to="/checkout" className="btn dm-btn-primary w-100 d-flex justify-content-center align-items-center gap-2">
                  Lanjut ke Checkout <i className="bi bi-arrow-right" aria-hidden="true"></i>
                </Link>
                <p className="dm-cart-summary-note">Checkout ini hanya simulasi, tanpa pembayaran sungguhan.</p>
              </aside>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Cart

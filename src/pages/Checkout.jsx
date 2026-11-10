import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const paymentMethods = ['Transfer Bank', 'E-Wallet', 'QRIS']

function Checkout() {
  const navigate = useNavigate()
  const { cartItems, cartTotal, createOrder } = useContext(ShopContext)
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    paymentMethod: '',
  })
  const [errors, setErrors] = useState({})

  const formatPrice = (price) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)

  function handleChange(event) {
    const { name, value } = event.target
    setCheckoutForm((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => ({ ...previous, [name]: '' }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (cartItems.length === 0) return

    const nextErrors = {}
    const name = checkoutForm.name.trim()
    const email = checkoutForm.email.trim()

    if (!name) nextErrors.name = 'Nama pembeli wajib diisi.'
    if (!email) {
      nextErrors.email = 'Email pembeli wajib diisi.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Masukkan alamat email yang valid.'
    }
    if (!paymentMethods.includes(checkoutForm.paymentMethod)) {
      nextErrors.paymentMethod = 'Pilih salah satu metode pembayaran.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const order = createOrder(name, email, checkoutForm.paymentMethod)
    if (order) navigate('/order-success', { replace: true })
  }

  return (
    <section className="dm-shop-page">
      <div className="container">
        <div className="dm-page-heading">
          <h1>Checkout</h1>
          <p>Lengkapi data pembeli untuk membuat pesanan simulasi.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="dm-shop-empty text-center">
            <i className="bi bi-bag-x" aria-hidden="true"></i>
            <h2>Belum ada produk untuk checkout</h2>
            <p>Tambahkan produk ke keranjang sebelum membuat pesanan.</p>
            <Link to="/products" className="btn dm-btn-primary mt-3">Jelajahi Produk</Link>
          </div>
        ) : (
          <div className="row g-4 align-items-start">
            <div className="col-lg-7">
              <div className="dm-checkout-panel">
                <div className="dm-checkout-panel-heading">
                  <h2>Informasi Pembeli</h2>
                  <p>Semua kolom wajib diisi untuk melanjutkan.</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-4">
                    <label className="form-label dm-form-label" htmlFor="buyerName">Nama Pembeli</label>
                    <input
                      id="buyerName"
                      name="name"
                      type="text"
                      className={`form-control dm-form-control ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Masukkan nama lengkap"
                      autoComplete="name"
                      maxLength={100}
                      required
                      value={checkoutForm.name}
                      onChange={handleChange}
                      aria-describedby={errors.name ? 'nameError' : undefined}
                    />
                    {errors.name && <div id="nameError" className="invalid-feedback">{errors.name}</div>}
                  </div>

                  <div className="mb-4">
                    <label className="form-label dm-form-label" htmlFor="buyerEmail">Email Pembeli</label>
                    <input
                      id="buyerEmail"
                      name="email"
                      type="email"
                      className={`form-control dm-form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="nama@email.com"
                      autoComplete="email"
                      maxLength={150}
                      required
                      value={checkoutForm.email}
                      onChange={handleChange}
                      aria-describedby={errors.email ? 'emailError' : undefined}
                    />
                    {errors.email && <div id="emailError" className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="mb-4">
                    <label className="form-label dm-form-label" htmlFor="paymentMethod">Metode Pembayaran</label>
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      className={`form-select dm-form-control ${errors.paymentMethod ? 'is-invalid' : ''}`}
                      required
                      value={checkoutForm.paymentMethod}
                      onChange={handleChange}
                      aria-describedby={errors.paymentMethod ? 'paymentError' : undefined}
                    >
                      <option value="">Pilih metode pembayaran</option>
                      {paymentMethods.map((method) => (
                        <option key={method} value={method}>{method}</option>
                      ))}
                    </select>
                    {errors.paymentMethod && (
                      <div id="paymentError" className="invalid-feedback">{errors.paymentMethod}</div>
                    )}
                  </div>

                  <button type="submit" className="btn dm-btn-primary dm-checkout-submit w-100">
                    <i className="bi bi-check-circle" aria-hidden="true"></i>
                    Buat Pesanan
                  </button>
                  <p className="dm-checkout-note mb-0">
                    <i className="bi bi-info-circle" aria-hidden="true"></i>
                    Ini hanya simulasi checkout. Tidak ada pembayaran sungguhan.
                  </p>
                </form>
              </div>
            </div>

            <div className="col-lg-5">
              <aside className="dm-checkout-panel dm-checkout-summary">
                <div className="dm-checkout-panel-heading">
                  <h2>Ringkasan Pesanan</h2>
                  <p>{cartItems.length} produk digital</p>
                </div>
                <div className="dm-checkout-products">
                  {cartItems.map((product) => (
                    <div key={product.id} className="dm-checkout-product">
                      <div className="dm-checkout-product-info">
                        <strong>{product.name}</strong>
                        <span>{product.category}</span>
                      </div>
                      <span className="dm-checkout-product-price">{formatPrice(product.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="dm-checkout-total">
                  <span>Total Pembayaran</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>
                <Link to="/cart" className="dm-checkout-back">
                  <i className="bi bi-arrow-left" aria-hidden="true"></i>
                  Kembali ke Keranjang
                </Link>
              </aside>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Checkout

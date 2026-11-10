import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

function OrderSuccess() {
  const { orderData } = useContext(ShopContext)

  const formatPrice = (price) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)

  if (!orderData) {
    return (
      <section className="dm-shop-page">
        <div className="container">
          <div className="dm-shop-empty text-center">
            <i className="bi bi-receipt" aria-hidden="true"></i>
            <h1 className="dm-order-empty-title">Belum ada pesanan</h1>
            <p>Buat pesanan dari keranjang untuk melihat konfirmasinya di sini.</p>
            <Link to="/products" className="btn dm-btn-primary mt-3">Jelajahi Produk</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="dm-shop-page">
      <div className="container">
        <div className="dm-order-intro">
          <div className="dm-order-success-icon">
            <i className="bi bi-check-lg" aria-hidden="true"></i>
          </div>
          <h1>Pesanan Berhasil Dibuat!</h1>
          <p>Pesanan simulasi kamu telah tercatat. Tidak ada pembayaran atau pengiriman file sungguhan.</p>
          <div className="dm-order-number">Nomor pesanan: <strong>{orderData.orderNumber}</strong></div>
        </div>

        <div className="row g-4 align-items-start">
          <div className="col-lg-6">
            <div className="dm-checkout-panel">
              <h2 className="dm-order-section-title">Detail Pembeli</h2>
              <dl className="dm-order-details mb-0">
                <div>
                  <dt>Nama Pembeli</dt>
                  <dd>{orderData.buyerName}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{orderData.buyerEmail}</dd>
                </div>
                <div>
                  <dt>Metode Pembayaran (Dummy)</dt>
                  <dd>{orderData.paymentMethod}</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="dm-checkout-panel">
              <h2 className="dm-order-section-title">Ringkasan Produk</h2>
              <div className="dm-checkout-products">
                {orderData.items.map((product) => (
                  <div className="dm-checkout-product" key={product.id}>
                    <strong className="dm-order-product-name">{product.name}</strong>
                    <span className="dm-checkout-product-price">{formatPrice(product.price)}</span>
                  </div>
                ))}
              </div>
              <div className="dm-checkout-total">
                <span>Total Pembayaran</span>
                <strong>{formatPrice(orderData.total)}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 d-flex flex-wrap gap-3">
          <Link to="/orders" className="btn dm-btn-primary d-inline-flex align-items-center gap-2">
            <i className="bi bi-clock-history" aria-hidden="true"></i>
            Lihat Riwayat Pesanan
          </Link>
          <Link to="/products" className="btn dm-btn-secondary d-inline-flex align-items-center gap-2">
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    </section>
  )
}

export default OrderSuccess

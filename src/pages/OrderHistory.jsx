import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

function OrderHistory() {
  const { orderHistory } = useContext(ShopContext)

  const formatPrice = (price) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)

  function formatDate(value) {
    if (!value || Number.isNaN(new Date(value).getTime())) return 'Tanggal tidak tersedia'
    return new Date(value).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <section className="dm-shop-page">
      <div className="container">
        <div className="dm-page-heading">
          <h1>Riwayat Pesanan</h1>
          <p>Lihat kembali daftar pesanan digital yang pernah kamu buat.</p>
        </div>

        {orderHistory.length === 0 ? (
          <div className="dm-shop-empty text-center">
            <i className="bi bi-clock-history" aria-hidden="true"></i>
            <h2>Belum ada riwayat pesanan</h2>
            <p>Pesanan yang berhasil dibuat melalui checkout akan muncul di sini.</p>
            <Link to="/products" className="btn dm-btn-primary mt-3">Jelajahi Produk</Link>
          </div>
        ) : (
          <div className="dm-history-list">
            {orderHistory.map((order, index) => (
              <article className="dm-history-card" key={`${order.orderNumber}-${index}`}>
                <div className="dm-history-card-top">
                  <div>
                    <span className="dm-history-label">Nomor Pesanan</span>
                    <h2 className="dm-history-number">{order.orderNumber}</h2>
                    <p className="dm-history-date mb-0">
                      <i className="bi bi-calendar3" aria-hidden="true"></i>
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <span className="dm-history-status">Pesanan Simulasi</span>
                </div>

                <div className="dm-history-card-content">
                  <div className="dm-history-products">
                    <h3>Produk ({order.items.length})</h3>
                    {order.items.map((item, itemIndex) => (
                      <div className="dm-history-item" key={`${item.id}-${itemIndex}`}>
                        <span>{item.name}</span>
                        <strong>{formatPrice(item.price)}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="dm-history-buyer">
                    <h3>Informasi Pembeli</h3>
                    <p className="dm-history-buyer-name">{order.buyerName}</p>
                    <p className="dm-history-buyer-email">{order.buyerEmail}</p>
                    <span className="dm-history-payment-label">Metode pembayaran</span>
                    <strong>{order.paymentMethod}</strong>
                  </div>
                </div>

                <div className="dm-history-card-bottom">
                  <span>Total Pesanan</span>
                  <strong>{formatPrice(order.total)}</strong>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="dm-history-note">
          <i className="bi bi-info-circle" aria-hidden="true"></i>
          Riwayat hanya tersimpan di browser perangkat ini. Tidak ada pembayaran atau transaksi sungguhan.
        </p>
      </div>
    </section>
  )
}

export default OrderHistory

import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="dm-inner-page container">
      <p className="dm-error-number mb-2">404</p>
      <h1 className="dm-page-title mb-3">Halaman tidak ditemukan</h1>
      <p className="dm-page-description mb-4">Alamat halaman yang kamu buka tidak tersedia di DigiMarket.</p>
      <Link to="/" className="btn dm-btn-primary">Kembali ke Home</Link>
    </section>
  )
}

export default NotFound

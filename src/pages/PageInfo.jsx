import { Link } from 'react-router-dom'

function PageInfo({ title, description, icon }) {
  return (
    <section className="dm-inner-page container">
      <div className="dm-page-icon mb-4"><i className={`bi ${icon}`} aria-hidden="true"></i></div>
      <p className="dm-page-eyebrow mb-2">DIGIMARKET</p>
      <h1 className="dm-page-title mb-3">{title}</h1>
      <p className="dm-page-description mb-4">{description}</p>
      <Link to="/" className="btn dm-btn-secondary d-inline-flex align-items-center gap-2">
        <i className="bi bi-arrow-left" aria-hidden="true"></i> Kembali ke Home
      </Link>
    </section>
  )
}

export default PageInfo

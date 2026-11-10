import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="dm-footer mt-auto">
      <div className="container py-4">
        <div>
          <Link to="/" className="dm-footer-brand">Digi<span>Market</span></Link>
          <p className="dm-footer-copy mb-0 mt-2">Tempat menemukan aset digital untuk kebutuhan kreatifmu.</p>
        </div>
        <div className="dm-footer-bottom d-flex justify-content-center">
          <small className="dm-footer-copy">© {new Date().getFullYear()} DigiMarket. All right reserved.</small>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartItems, wishlistItems } = useContext(ShopContext)

  const closeMenu = () => setMenuOpen(false)
  const navClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`

  return (
    <nav className="navbar navbar-expand-lg dm-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand dm-brand d-flex align-items-center gap-2" to="/" onClick={closeMenu}>
          <span className="dm-brand-icon">
            <i className="bi bi-layers-fill" aria-hidden="true"></i>
          </span>
          <span>Digi<span className="dm-brand-accent">Market</span></span>
        </Link>

        <button
          className="navbar-toggler dm-toggler d-lg-none"
          type="button"
          aria-controls="mainNavigation"
          aria-expanded={menuOpen}
          aria-label="Buka atau tutup menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`} aria-hidden="true"></i>
        </button>

        <div
          className={`collapse navbar-collapse justify-content-lg-end ${menuOpen ? 'show' : ''}`}
          id="mainNavigation"
        >
          <div className="navbar-nav dm-main-nav gap-lg-1">
            <NavLink to="/" end className={navClass} onClick={closeMenu}>
              <i className="bi bi-house-door" aria-hidden="true"></i>
              <span>Home</span>
            </NavLink>

            <NavLink to="/products" className={navClass} onClick={closeMenu}>
              <i className="bi bi-grid" aria-hidden="true"></i>
              <span>Katalog</span>
            </NavLink>

            <NavLink to="/orders" className={navClass} onClick={closeMenu}>
              <i className="bi bi-clock-history" aria-hidden="true"></i>
              <span>Riwayat Pesanan</span>
            </NavLink>

            <NavLink
              to="/wishlist"
              className={navClass}
              aria-label={`Wishlist, ${wishlistItems.length} produk`}
              onClick={closeMenu}
            >
              <i className={`bi ${wishlistItems.length > 0 ? 'bi-heart-fill' : 'bi-heart'}`} aria-hidden="true"></i>
              <span>Wishlist</span>
            </NavLink>

            <NavLink
              to="/cart"
              className={navClass}
              aria-label={`Keranjang, ${cartItems.length} produk`}
              onClick={closeMenu}
            >
              <i className="bi bi-bag" aria-hidden="true"></i>
              <span>Keranjang</span>
              {cartItems.length > 0 && (
                <span className="dm-nav-count" aria-hidden="true">{cartItems.length}</span>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

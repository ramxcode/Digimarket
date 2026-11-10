function SearchFilter({ searchQuery, onSearchChange, selectedCategory, onCategoryChange, sortOrder, onSortChange, categories, onReset }) {
  return (
    <div className="dm-filter-panel">
      <div className="row g-3 align-items-end">
        <div className="col-12 col-lg-5">
          <label htmlFor="searchProduct" className="dm-field-label">Cari produk</label>
          <div className="dm-search-input-wrap">
            <i className="bi bi-search" aria-hidden="true"></i>
            <input
              id="searchProduct"
              type="search"
              className="form-control dm-input dm-search-input"
              placeholder="Cari nama produk..."
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <label htmlFor="categoryFilter" className="dm-field-label">Kategori</label>
          <select
            id="categoryFilter"
            className="form-select dm-input"
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            <option value="all">Semua Kategori</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="col-12 col-sm-6 col-lg-2">
          <label htmlFor="sortProduct" className="dm-field-label">Urutkan</label>
          <select
            id="sortProduct"
            className="form-select dm-input"
            value={sortOrder}
            onChange={(event) => onSortChange(event.target.value)}
          >
            <option value="default">Pilihan awal</option>
            <option value="price-asc">Harga terendah</option>
            <option value="price-desc">Harga tertinggi</option>
          </select>
        </div>

        <div className="col-12 col-lg-2">
          <button type="button" className="btn dm-reset-button w-100" onClick={onReset}>
            <i className="bi bi-arrow-counterclockwise" aria-hidden="true"></i> Reset Filter
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchFilter

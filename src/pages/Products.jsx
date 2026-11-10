import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import SearchFilter from '../components/SearchFilter'
import products from '../data/products.json'

const categories = [...new Set(products.map((product) => product.category))]

function Products() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('default')
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  const selectedCategory = categories.includes(categoryParam) ? categoryParam : 'all'

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    .filter((product) => selectedCategory === 'all' || product.category === selectedCategory)
    .sort((a, b) => {
      if (sortOrder === 'price-asc') return a.price - b.price
      if (sortOrder === 'price-desc') return b.price - a.price
      return 0
    })

  function changeCategory(category) {
    setSearchParams(category === 'all' ? {} : { category })
  }

  function resetFilters() {
    setSearchQuery('')
    setSortOrder('default')
    setSearchParams({})
  }

  return (
    <div className="dm-catalog-page">
      <div className="container">
        <div className="dm-page-heading">
          <h1>Katalog Produk</h1>
          <p>Temukan aset digital yang cocok untuk proyek dan kebutuhan kreatifmu.</p>
        </div>

        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={changeCategory}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          categories={categories}
          onReset={resetFilters}
        />

        <div className="d-flex justify-content-between align-items-center gap-3 dm-catalog-meta">
          <h2 className="dm-results-heading mb-0">
            {selectedCategory !== 'all' ? selectedCategory : 'Semua Produk'}
          </h2>
          <span className="dm-results-count">{filteredProducts.length} dari {products.length} produk</span>
        </div>

        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  )
}

export default Products

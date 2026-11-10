import { createContext, useEffect, useState } from 'react'
import products from '../data/products.json'

export const ShopContext = createContext(null)

const productIds = products.map((product) => product.id)

function readSavedIds(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || '[]')
    if (!Array.isArray(saved)) return []
    return [...new Set(saved.filter((id) => productIds.includes(id)))]
  } catch {
    return []
  }
}

function readSavedOrder() {
  try {
    const saved = JSON.parse(sessionStorage.getItem('digimarket_last_order') || 'null')
    if (!saved || typeof saved.orderNumber !== 'string' ||
        typeof saved.buyerName !== 'string' ||
        typeof saved.buyerEmail !== 'string' ||
        typeof saved.paymentMethod !== 'string' ||
        !Array.isArray(saved.items) ||
        !Number.isFinite(saved.total)) return null
    return saved
  } catch {
    return null
  }
}

function readSavedHistory() {
  try {
    const saved = JSON.parse(localStorage.getItem('digimarket_order_history') || '[]')
    if (!Array.isArray(saved)) return []
    return saved.filter((order) =>
      order &&
      typeof order.orderNumber === 'string' &&
      typeof order.buyerName === 'string' &&
      typeof order.buyerEmail === 'string' &&
      typeof order.paymentMethod === 'string' &&
      Array.isArray(order.items) &&
      order.items.every((item) =>
        item && typeof item.name === 'string' && Number.isFinite(item.price)
      ) &&
      Number.isFinite(order.total)
    )
  } catch {
    return []
  }
}

function ShopProvider({ children }) {
  const [cartIds, setCartIds] = useState(() => readSavedIds('digimarket_cart'))
  const [wishlistIds, setWishlistIds] = useState(() => readSavedIds('digimarket_wishlist'))
  const [orderData, setOrderData] = useState(readSavedOrder)
  const [orderHistory, setOrderHistory] = useState(() => {
    const saved = readSavedHistory()
    const previousOrder = readSavedOrder()
    if (previousOrder && !saved.some((item) => item.orderNumber === previousOrder.orderNumber)) {
      return [previousOrder, ...saved]
    }
    return saved
  })

  useEffect(() => {
    localStorage.setItem('digimarket_cart', JSON.stringify(cartIds))
  }, [cartIds])

  useEffect(() => {
    localStorage.setItem('digimarket_wishlist', JSON.stringify(wishlistIds))
  }, [wishlistIds])

  useEffect(() => {
    try {
      localStorage.setItem('digimarket_order_history', JSON.stringify(orderHistory))
    } catch {
    }
  }, [orderHistory])

  function addToCart(id) {
    if (!productIds.includes(id)) return
    setCartIds((previous) => previous.includes(id) ? previous : [...previous, id])
  }

  function removeFromCart(id) {
    setCartIds((previous) => previous.filter((itemId) => itemId !== id))
  }

  function toggleWishlist(id) {
    if (!productIds.includes(id)) return
    setWishlistIds((previous) => previous.includes(id)
      ? previous.filter((itemId) => itemId !== id)
      : [...previous, id]
    )
  }

  const cartItems = cartIds.map((id) => products.find((product) => product.id === id))
  const wishlistItems = wishlistIds.map((id) => products.find((product) => product.id === id))
  const cartTotal = cartItems.reduce((total, product) => total + product.price, 0)

  function createOrder(buyerName, buyerEmail, paymentMethod) {
    if (cartItems.length === 0) return null

    const order = {
      orderNumber: `DM-${Date.now()}`,
      createdAt: new Date().toISOString(),
      buyerName,
      buyerEmail,
      paymentMethod,
      items: cartItems.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
      total: cartTotal,
    }

    setOrderData(order)
    setOrderHistory((previous) => [order, ...previous])
    try {
      sessionStorage.setItem('digimarket_last_order', JSON.stringify(order))
    } catch {
    }
    setCartIds([])
    return order
  }

  const value = {
    cartItems,
    wishlistItems,
    cartTotal,
    orderData,
    orderHistory,
    addToCart,
    removeFromCart,
    toggleWishlist,
    createOrder,
    isInCart: (id) => cartIds.includes(id),
    isInWishlist: (id) => wishlistIds.includes(id),
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export default ShopProvider

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'krown-cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [justAdded, setJustAdded] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product, size = 'S / M', qty = 1) => {
    setItems((prev) => {
      const key = `${product.slug}__${size}`
      const existing = prev.find((i) => i.key === key)
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
      }
      return [
        ...prev,
        {
          key,
          slug: product.slug,
          name: product.name,
          color: product.color,
          price: product.price,
          crown: product.crown,
          accent: product.accent,
          size,
          qty,
        },
      ]
    })
    setJustAdded(`${product.slug}__${size}`)
    setTimeout(() => setJustAdded(null), 1600)
  }

  const removeItem = (key) => setItems((prev) => prev.filter((i) => i.key !== key))

  const updateQty = (key, qty) =>
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: Math.max(0, qty) } : i))
        .filter((i) => i.qty > 0)
    )

  const clear = () => setItems([])

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0)
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0)
    return { items, addItem, removeItem, updateQty, clear, count, subtotal, justAdded }
  }, [items, justAdded])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

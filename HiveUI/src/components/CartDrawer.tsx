import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

export const CartDrawer = () => {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background border-l border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary" />
                <h2 className="font-display text-xl font-semibold">Your Cart</h2>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-2 text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground font-body">Your cart is empty</p>
                  <button onClick={() => setCartOpen(false)} className="mt-4 text-primary text-sm font-medium hover:underline">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <img src={item.product.image} alt={item.product.name} className="w-20 h-24 rounded-md object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.product.brand}</p>
                      <p className="text-sm font-medium font-body truncate">{item.product.name}</p>
                      <p className="text-sm font-semibold mt-1">${item.product.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 rounded border border-border hover:bg-secondary">
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded border border-border hover:bg-secondary">
                          <Plus size={12} />
                        </button>
                        <button onClick={() => removeItem(item.product.id)} className="ml-auto text-xs text-muted-foreground hover:text-destructive">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-body">Subtotal</span>
                  <span className="text-xl font-semibold font-display">${totalPrice().toFixed(2)}</span>
                </div>
                <Link to="/checkout" onClick={() => setCartOpen(false)} className="block w-full py-3 bg-primary text-primary-foreground rounded-lg font-body font-medium hover:opacity-90 transition-opacity text-center">
                  Checkout
                </Link>
                <button onClick={clearCart} className="w-full text-sm text-muted-foreground hover:text-foreground text-center">
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

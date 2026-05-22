import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, Heart, Menu, X, User } from "lucide-react";
import { useState, useCallback } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { motion, AnimatePresence } from "framer-motion";
import { SearchRecommendations } from "@/components/SearchRecommendations";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Beauty", path: "/category/perfumes" },
  { name: "Fashion", path: "/category/clothing" },
  { name: "Electronics", path: "/category/electronics" },
  { name: "Toys", path: "/category/toys" },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showRecs, setShowRecs] = useState(false);
  const location = useLocation();
  const { toggleCart, totalItems } = useCartStore();
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const cartCount = totalItems();

  const closeRecs = useCallback(() => setShowRecs(false), []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="bg-navy text-navy-foreground text-center text-xs py-2 font-body tracking-wide">
          Free shipping on orders over $75 · Use code <span className="font-semibold">TREND20</span> for 20% off
        </div>

        <div className="container flex items-center justify-between h-16 gap-4">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-foreground">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link to="/" className="font-display text-2xl font-bold tracking-tight text-foreground">
            Trend<span className="text-primary">Hive</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium font-body transition-colors hover:text-primary ${
                  location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => { setSearchOpen(!searchOpen); setShowRecs(false); }} className="p-2 text-foreground hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="p-2 text-foreground hover:text-primary transition-colors relative">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button onClick={toggleCart} className="p-2 text-foreground hover:text-primary transition-colors relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Link to="/login" className="hidden sm:flex p-2 text-foreground hover:text-primary transition-colors">
              <User size={20} />
            </Link>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border overflow-visible"
            >
              <div className="container py-4">
                <div className="relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setShowRecs(true); }}
                    onFocus={() => setShowRecs(true)}
                    placeholder="Search for products, brands, categories..."
                    className="w-full pl-12 pr-4 py-3 bg-secondary rounded-lg text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <SearchRecommendations query={searchQuery} isOpen={showRecs} onClose={closeRecs} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed inset-0 z-40 bg-background lg:hidden"
          >
            <div className="pt-32 px-8 space-y-6">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                  className="block text-2xl font-display font-semibold text-foreground hover:text-primary transition-colors">
                  {link.name}
                </Link>
              ))}
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-2xl font-display font-semibold text-foreground hover:text-primary">
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

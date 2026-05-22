import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, TrendingUp, Clock, X } from "lucide-react";
import { products } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

interface SearchRecommendationsProps {
  query: string;
  isOpen: boolean;
  onClose: () => void;
}

const trendingSearches = ["Summer Collection", "Wireless Earbuds", "Skincare Routine", "Teddy Bears", "Perfume Gift Set"];

export const SearchRecommendations = ({ query, isOpen, onClose }: SearchRecommendationsProps) => {
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem("trendhive-recent-searches");
    return saved ? JSON.parse(saved) : [];
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const filteredProducts = query.length >= 2
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  const addRecent = (term: string) => {
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("trendhive-recent-searches", JSON.stringify(updated));
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem("trendhive-recent-searches");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        className="absolute top-full left-0 right-0 bg-card border border-border rounded-lg shadow-lg mt-1 z-50 max-h-[70vh] overflow-y-auto"
      >
        {filteredProducts.length > 0 ? (
          <div className="p-3">
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-2 px-2">Products</p>
            {filteredProducts.map(p => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                onClick={() => { addRecent(p.name); onClose(); }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium font-body text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.brand} · ${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-3 space-y-4">
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between px-2 mb-2">
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">Recent</p>
                  <button onClick={clearRecent} className="text-xs text-primary hover:underline">Clear</button>
                </div>
                {recentSearches.map(s => (
                  <button key={s} className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-secondary text-left text-sm font-body text-foreground">
                    <Clock size={14} className="text-muted-foreground" /> {s}
                  </button>
                ))}
              </div>
            )}
            <div>
              <p className="text-xs text-muted-foreground font-body uppercase tracking-wider px-2 mb-2">Trending</p>
              {trendingSearches.map(s => (
                <button key={s} className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-secondary text-left text-sm font-body text-foreground">
                  <TrendingUp size={14} className="text-primary" /> {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

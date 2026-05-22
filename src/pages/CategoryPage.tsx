import { useParams, Link, useNavigate } from "react-router-dom";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { CategoryFilters } from "@/components/CategoryFilters";
import { useState, useMemo } from "react";
import { ArrowLeft, SlidersHorizontal, X } from "lucide-react";

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const category = categories.find(c => c.slug === slug);
  const categoryProducts = products.filter(p => p.category === slug);
  const [sortBy, setSortBy] = useState("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter state
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 999]);
  const [minRating, setMinRating] = useState(0);

  const brands = useMemo(() => [...new Set(categoryProducts.map(p => p.brand))].sort(), [slug]);
  const prices = categoryProducts.map(p => p.price);
  const minPrice = Math.floor(Math.min(...prices, 0));
  const maxPrice = Math.ceil(Math.max(...prices, 999));

  const filtered = categoryProducts.filter(p => {
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    if (p.rating < minRating) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const clearAll = () => { setSelectedBrands([]); setPriceRange([minPrice, maxPrice]); setMinRating(0); };

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-body transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-foreground">{category?.name || slug}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">{category?.name || "Products"}</h1>
          <p className="text-muted-foreground font-body mt-1">{sorted.length} products</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowMobileFilters(true)} className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-body">
            <SlidersHorizontal size={14} /> Filters
          </button>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="bg-secondary text-foreground text-sm px-4 py-2 rounded-lg border border-border font-body">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <div className="hidden lg:block w-64 shrink-0">
          <CategoryFilters brands={brands} minPrice={minPrice} maxPrice={maxPrice}
            selectedBrands={selectedBrands} priceRange={priceRange} minRating={minRating}
            onBrandsChange={setSelectedBrands} onPriceChange={setPriceRange} onRatingChange={setMinRating} onClearAll={clearAll} />
        </div>

        {/* Products */}
        <div className="flex-1">
          {sorted.length === 0 ? (
            <p className="text-center text-muted-foreground py-20 font-body">No products match your filters.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {sorted.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-background p-6 overflow-y-auto border-l border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)}><X size={20} /></button>
            </div>
            <CategoryFilters brands={brands} minPrice={minPrice} maxPrice={maxPrice}
              selectedBrands={selectedBrands} priceRange={priceRange} minRating={minRating}
              onBrandsChange={setSelectedBrands} onPriceChange={setPriceRange} onRatingChange={setMinRating} onClearAll={clearAll} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;

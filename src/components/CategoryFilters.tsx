import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Star } from "lucide-react";

interface CategoryFiltersProps {
  brands: string[];
  minPrice: number;
  maxPrice: number;
  selectedBrands: string[];
  priceRange: [number, number];
  minRating: number;
  onBrandsChange: (brands: string[]) => void;
  onPriceChange: (range: [number, number]) => void;
  onRatingChange: (rating: number) => void;
  onClearAll: () => void;
}

export const CategoryFilters = ({
  brands, minPrice, maxPrice, selectedBrands, priceRange, minRating,
  onBrandsChange, onPriceChange, onRatingChange, onClearAll,
}: CategoryFiltersProps) => {
  const [showBrands, setShowBrands] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showRating, setShowRating] = useState(true);

  const hasFilters = selectedBrands.length > 0 || minRating > 0 || priceRange[0] > minPrice || priceRange[1] < maxPrice;

  const toggleBrand = (brand: string) => {
    onBrandsChange(
      selectedBrands.includes(brand)
        ? selectedBrands.filter(b => b !== brand)
        : [...selectedBrands, brand]
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Filters</h3>
        {hasFilters && (
          <button onClick={onClearAll} className="text-xs text-primary hover:underline font-body flex items-center gap-1">
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="border-t border-border pt-4">
        <button onClick={() => setShowPrice(!showPrice)} className="flex items-center justify-between w-full text-sm font-medium font-body">
          Price Range {showPrice ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {showPrice && (
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-2">
              <input type="number" value={priceRange[0]} onChange={e => onPriceChange([+e.target.value, priceRange[1]])}
                className="w-full px-3 py-2 bg-secondary rounded text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary" min={minPrice} max={priceRange[1]} />
              <span className="text-muted-foreground text-sm">–</span>
              <input type="number" value={priceRange[1]} onChange={e => onPriceChange([priceRange[0], +e.target.value])}
                className="w-full px-3 py-2 bg-secondary rounded text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary" min={priceRange[0]} max={maxPrice} />
            </div>
            <input type="range" min={minPrice} max={maxPrice} value={priceRange[1]}
              onChange={e => onPriceChange([priceRange[0], +e.target.value])}
              className="w-full accent-primary" />
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="border-t border-border pt-4">
        <button onClick={() => setShowBrands(!showBrands)} className="flex items-center justify-between w-full text-sm font-medium font-body">
          Brand {showBrands ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {showBrands && (
          <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
            {brands.map(brand => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer text-sm font-body">
                <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)}
                  className="rounded accent-primary" />
                {brand}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="border-t border-border pt-4">
        <button onClick={() => setShowRating(!showRating)} className="flex items-center justify-between w-full text-sm font-medium font-body">
          Rating {showRating ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {showRating && (
          <div className="mt-3 space-y-2">
            {[4, 3, 2, 1].map(r => (
              <button key={r} onClick={() => onRatingChange(minRating === r ? 0 : r)}
                className={`flex items-center gap-1 w-full text-sm font-body p-1.5 rounded transition-colors ${
                  minRating === r ? "bg-primary/10 text-primary" : "hover:bg-secondary"
                }`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={14} className={i < r ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"} />
                ))}
                <span className="ml-1">& up</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

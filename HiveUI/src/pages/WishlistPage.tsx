import { products } from "@/data/products";
import { useWishlistStore } from "@/store/useWishlistStore";
import { ProductCard } from "@/components/ProductCard";
import { Heart, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const { items } = useWishlistStore();
  const navigate = useNavigate();
  const wishlistProducts = products.filter(p => items.includes(p.id));

  return (
    <div className="container py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-body transition-colors mb-6">
        <ArrowLeft size={16} /> Back
      </button>

      <h1 className="font-display text-3xl font-bold text-foreground mb-2">My Wishlist</h1>
      <p className="text-muted-foreground font-body mb-8">{wishlistProducts.length} items saved</p>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-20">
          <Heart size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground font-body">Your wishlist is empty</p>
          <Link to="/" className="mt-4 inline-block text-primary text-sm font-medium hover:underline">Explore Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

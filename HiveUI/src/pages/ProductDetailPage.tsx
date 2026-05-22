import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Heart, ShoppingBag, Star, Truck, RotateCcw, Shield, ArrowLeft, Share2, Zap, CheckCircle } from "lucide-react";
import { useState } from "react";

import { ProductCard } from "@/components/ProductCard";
import { ProductReviews } from "@/components/ProductReviews";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const addItem = useCartStore(s => s.addItem);
  const toggleCart = useCartStore(s => s.toggleCart);
  const { toggleItem, isWishlisted } = useWishlistStore();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-display text-2xl">Product not found</h1>
        <Link to="/" className="text-primary mt-4 inline-block hover:underline">Go Home</Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    toggleCart();
  };

  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    toggleCart();
    toast.success("Proceeding to checkout!");
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: product.name, text: product.description, url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="container py-8">
      {/* Back button + Breadcrumb */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-body transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-primary capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground truncate">{product.name}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="aspect-square rounded-xl overflow-hidden bg-secondary">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground font-body uppercase tracking-wider">{product.brand}</p>
            <h1 className="font-display text-3xl font-bold text-foreground mt-1">{product.name}</h1>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-border"} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-body">{product.rating} ({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-display font-bold text-foreground">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">-{discount}%</span>
              </>
            )}
          </div>

          <p className="text-muted-foreground font-body leading-relaxed">{product.description}</p>

          {/* Product Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="bg-secondary rounded-xl p-5">
              <h3 className="font-body font-semibold text-foreground text-sm mb-3">Product Highlights</h3>
              <ul className="grid grid-cols-2 gap-2">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                    <CheckCircle size={14} className="text-sage shrink-0" /> {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity + Actions */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-foreground hover:bg-secondary">−</button>
                <span className="px-4 py-3 font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-foreground hover:bg-secondary">+</button>
              </div>
              <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-body font-medium hover:opacity-90 transition-opacity">
                <ShoppingBag size={18} /> Add to Cart
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleBuyNow} className="flex-1 flex items-center justify-center gap-2 bg-gold text-gold-foreground py-3 rounded-lg font-body font-medium hover:opacity-90 transition-opacity">
                <Zap size={18} /> Buy Now
              </button>
              <button onClick={() => toggleItem(product.id)} className={`p-3 rounded-lg border ${wishlisted ? 'border-accent bg-accent/10' : 'border-border'}`}>
                <Heart size={20} className={wishlisted ? "fill-accent text-accent" : "text-foreground"} />
              </button>
              <button onClick={handleShare} className="p-3 rounded-lg border border-border hover:bg-secondary transition-colors">
                <Share2 size={20} className="text-foreground" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            {[
              { icon: Truck, label: "Free Shipping", sub: "Orders $75+" },
              { icon: RotateCcw, label: "Easy Returns", sub: "30-day policy" },
              { icon: Shield, label: "Secure Pay", sub: "100% protected" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="text-center">
                <Icon size={20} className="mx-auto text-primary mb-1" />
                <p className="text-xs font-medium font-body">{label}</p>
                <p className="text-[10px] text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ProductReviews productId={product.id} rating={product.rating} totalReviews={product.reviews} />

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;

import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { products, categories } from "@/data/products";

const HeroScene = lazy(() => import("@/components/HeroScene"));

const HeroSection = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary">
    <Suspense fallback={null}>
      <HeroScene />
    </Suspense>
    <div className="container py-16 md:py-28 relative z-10">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full font-body uppercase tracking-wider mb-6">
            New Season Collection
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Discover Your <br />
            <span className="text-primary">Perfect Style</span>
          </h1>
          <p className="mt-6 text-muted-foreground font-body text-lg leading-relaxed max-w-md">
            From luxury beauty to cutting-edge electronics — curated collections that define modern living.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/category/perfumes" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-body font-medium hover:opacity-90 transition-opacity">
              Shop Now <ArrowRight size={16} />
            </Link>
            <Link to="/category/clothing" className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg font-body font-medium hover:bg-secondary transition-colors">
              Explore Fashion
            </Link>
          </div>
        </div>
        <div className="relative hidden md:block">
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400" alt="Beauty" className="rounded-xl aspect-[3/4] object-cover w-full" />
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400" alt="Fashion" className="rounded-xl aspect-[3/4] object-cover w-full mt-8" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Index = () => {
  const featured = products.slice(0, 8);
  const trending = products.filter(p => p.tags.includes("trending") || p.tags.includes("bestseller")).slice(0, 8);

  return (
    <div>
      <HeroSection />

      <section className="container py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">Shop by Category</h2>
            <p className="text-muted-foreground font-body mt-1">Browse our curated collections</p>
          </div>
          <Link to="/category/perfumes" className="text-sm font-medium text-primary hover:underline hidden sm:block">View All →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => <CategoryCard key={cat.id} category={cat} index={i} />)}
        </div>
      </section>

      <section className="container py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">Featured Products</h2>
            <p className="text-muted-foreground font-body mt-1">Handpicked just for you</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
        </div>
      </section>

      <section className="container py-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary/20 via-accent/10 to-gold/20 p-12 md:p-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Summer Sale — Up to 40% Off</h2>
          <p className="mt-3 text-muted-foreground font-body max-w-lg mx-auto">Don't miss out on incredible deals across beauty, fashion, and electronics.</p>
          <Link to="/category/clothing" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-body font-medium mt-6 hover:opacity-90 transition-opacity">
            Shop the Sale <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="container py-16">
        <h2 className="font-display text-3xl font-bold text-foreground mb-8">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trending.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
        </div>
      </section>
    </div>
  );
};

export default Index;

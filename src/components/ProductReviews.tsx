import { Star, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  helpful: number;
  verified: boolean;
}

const generateReviews = (productId: string, rating: number): Review[] => {
  const names = ["Sarah M.", "James K.", "Priya D.", "Alex T.", "Maria L.", "David R.", "Emma W.", "Chen Y."];
  const titles = ["Love this product!", "Great quality", "Exceeded expectations", "Good value", "Highly recommend", "Perfect gift", "Amazing!", "Solid purchase"];
  const bodies = [
    "Absolutely fantastic quality. I've been using this for a month and it's held up perfectly. Would definitely buy again.",
    "The product arrived quickly and was exactly as described. Very happy with my purchase.",
    "This exceeded my expectations in every way. The quality is premium and it looks even better in person.",
    "Good product for the price. A few minor issues but overall I'm satisfied with the purchase.",
    "I bought this as a gift and they absolutely loved it. The packaging was beautiful too.",
    "Five stars from me! I've tried many similar products and this one is by far the best.",
  ];
  const seed = parseInt(productId) || 1;
  return Array.from({ length: 6 }, (_, i) => ({
    id: `rev-${productId}-${i}`,
    name: names[(seed + i) % names.length],
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${names[(seed + i) % names.length]}`,
    rating: Math.max(3, Math.min(5, Math.round(rating - 0.5 + Math.random()))),
    date: new Date(Date.now() - (i + 1) * 86400000 * (3 + i * 2)).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
    title: titles[(seed + i) % titles.length],
    body: bodies[(seed + i) % bodies.length],
    helpful: Math.floor(Math.random() * 30) + 1,
    verified: Math.random() > 0.3,
  }));
};

export const ProductReviews = ({ productId, rating, totalReviews }: { productId: string; rating: number; totalReviews: number }) => {
  const reviews = generateReviews(productId, rating);
  const [helpfulClicked, setHelpfulClicked] = useState<Set<string>>(new Set());

  const distribution = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    return { star, count, pct: (count / reviews.length) * 100 };
  });

  const toggleHelpful = (id: string) => {
    setHelpfulClicked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="font-display text-2xl font-bold text-foreground mb-8">Ratings & Reviews</h2>
      <div className="grid md:grid-cols-[280px_1fr] gap-10">
        {/* Summary */}
        <div className="space-y-4">
          <div className="text-center md:text-left">
            <p className="text-5xl font-display font-bold text-foreground">{rating}</p>
            <div className="flex items-center gap-1 justify-center md:justify-start mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < Math.floor(rating) ? "fill-gold text-gold" : "text-border"} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground font-body mt-1">Based on {totalReviews} reviews</p>
          </div>
          <div className="space-y-2">
            {distribution.map(({ star, count, pct }) => (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-6 text-right font-body text-muted-foreground">{star}</span>
                <Star size={12} className="fill-gold text-gold" />
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-6 text-left text-muted-foreground font-body">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews list */}
        <div className="space-y-6">
          {reviews.map((rev, i) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-border pb-6 last:border-0"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img src={rev.avatar} alt={rev.name} className="w-8 h-8 rounded-full bg-secondary" />
                  <div>
                    <p className="text-sm font-medium font-body text-foreground">{rev.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < rev.rating ? "fill-gold text-gold" : "text-border"} />
                        ))}
                      </div>
                      {rev.verified && (
                        <span className="text-[10px] bg-sage/20 text-sage font-body font-medium px-1.5 py-0.5 rounded">Verified</span>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground font-body">{rev.date}</span>
              </div>
              <h4 className="font-body font-medium text-foreground mt-3">{rev.title}</h4>
              <p className="text-sm text-muted-foreground font-body mt-1 leading-relaxed">{rev.body}</p>
              <button
                onClick={() => toggleHelpful(rev.id)}
                className={`flex items-center gap-1 mt-3 text-xs font-body transition-colors ${helpfulClicked.has(rev.id) ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                <ThumbsUp size={12} /> Helpful ({rev.helpful + (helpfulClicked.has(rev.id) ? 1 : 0)})
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

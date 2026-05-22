import { Link } from "react-router-dom";
import { Category } from "@/data/products";

export const CategoryCard = ({ category, index = 0 }: { category: Category; index?: number }) => (
  <Link
    to={`/category/${category.slug}`}
    className="group block relative aspect-square overflow-hidden rounded-xl"
  >
    <img
      src={category.image}
      alt={category.name}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
    <div className="absolute bottom-4 left-4 right-4">
      <h3 className="font-display text-lg font-semibold text-background">{category.name}</h3>
      <p className="text-xs font-body text-background/70">{category.count} products</p>
    </div>
  </Link>
);

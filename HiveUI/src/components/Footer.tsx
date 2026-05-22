import { Link } from "react-router-dom";

const footerLinks = {
  Shop: ["Perfumes", "Lipsticks", "Skincare", "Clothing", "Electronics", "Toys"],
  Company: ["About Us", "Careers", "Press", "Blog"],
  Support: ["Help Center", "Shipping", "Returns", "Contact"],
  Legal: ["Privacy", "Terms", "Cookies"],
};

export const Footer = () => (
  <footer className="bg-navy text-navy-foreground mt-20">
    <div className="container py-16">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="font-display text-2xl font-bold">
            Trend<span className="text-primary">Hive</span>
          </Link>
          <p className="mt-4 text-sm opacity-70 font-body leading-relaxed">
            Curating the best in beauty, fashion, electronics & more.
          </p>
        </div>
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-display font-semibold mb-4 text-sm">{title}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity font-body">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-foreground/10 mt-12 pt-8 text-center text-xs opacity-50 font-body">
        © 2026 TrendHive. All rights reserved.
      </div>
    </div>
  </footer>
);

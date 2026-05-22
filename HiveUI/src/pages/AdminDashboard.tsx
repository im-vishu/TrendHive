import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "@/store/useAdminStore";
import { products, categories } from "@/data/products";
import { Package, Users, ShoppingCart, DollarSign, TrendingUp, LogOut, BarChart3, Settings, Eye, Edit, Trash2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { label: "Total Revenue", value: "$48,230", change: "+12.5%", icon: DollarSign, color: "text-sage" },
  { label: "Total Orders", value: "1,234", change: "+8.2%", icon: ShoppingCart, color: "text-primary" },
  { label: "Products", value: String(products.length), change: "+5", icon: Package, color: "text-gold" },
  { label: "Customers", value: "3,456", change: "+15.3%", icon: Users, color: "text-accent" },
];

const recentOrders = [
  { id: "ORD-001", customer: "Sarah Johnson", amount: 189.99, status: "Delivered", date: "2024-01-15" },
  { id: "ORD-002", customer: "James Smith", amount: 324.50, status: "Processing", date: "2024-01-15" },
  { id: "ORD-003", customer: "Maria Garcia", amount: 79.99, status: "Shipped", date: "2024-01-14" },
  { id: "ORD-004", customer: "Alex Chen", amount: 156.00, status: "Delivered", date: "2024-01-14" },
  { id: "ORD-005", customer: "Emma Wilson", amount: 412.99, status: "Processing", date: "2024-01-13" },
  { id: "ORD-006", customer: "David Brown", amount: 95.50, status: "Cancelled", date: "2024-01-13" },
];

const topCustomers = [
  { name: "Sarah Johnson", orders: 24, spent: "$4,230" },
  { name: "Alex Chen", orders: 18, spent: "$3,120" },
  { name: "Emma Wilson", orders: 15, spent: "$2,890" },
  { name: "James Smith", orders: 12, spent: "$2,450" },
];

type Tab = "overview" | "products" | "orders" | "customers";

const statusColor: Record<string, string> = {
  Delivered: "bg-sage/20 text-sage",
  Processing: "bg-gold/20 text-gold",
  Shipped: "bg-primary/20 text-primary",
  Cancelled: "bg-accent/20 text-accent",
};

const AdminDashboard = () => {
  const { logout } = useAdminStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const tabs: { id: Tab; label: string; icon: typeof BarChart3 }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "customers", label: "Customers", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
            <span className="text-xs bg-primary/10 text-primary font-body font-medium px-2 py-1 rounded-full">Admin</span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-body transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>

      <div className="container py-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-secondary rounded-lg p-1 mb-8 w-fit">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-body font-medium transition-colors ${
                tab === t.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <s.icon size={20} className={s.color} />
                    <span className="text-xs font-body text-sage font-medium flex items-center gap-1">
                      <TrendingUp size={12} /> {s.change}
                    </span>
                  </div>
                  <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground font-body mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders + Top Customers */}
            <div className="grid lg:grid-cols-[1fr_340px] gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold mb-4">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-body">
                    <thead>
                      <tr className="text-left text-muted-foreground border-b border-border">
                        <th className="pb-3 font-medium">Order</th>
                        <th className="pb-3 font-medium">Customer</th>
                        <th className="pb-3 font-medium">Amount</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map(o => (
                        <tr key={o.id} className="border-b border-border last:border-0">
                          <td className="py-3 font-medium text-foreground">{o.id}</td>
                          <td className="py-3 text-foreground">{o.customer}</td>
                          <td className="py-3 text-foreground">${o.amount}</td>
                          <td className="py-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[o.status]}`}>{o.status}</span></td>
                          <td className="py-3 text-muted-foreground">{o.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold mb-4">Top Customers</h3>
                <div className="space-y-4">
                  {topCustomers.map((c, i) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{i + 1}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground font-body">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.orders} orders</p>
                      </div>
                      <span className="text-sm font-semibold text-foreground font-body">{c.spent}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sales by Category */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Sales by Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map(cat => {
                  const catProducts = products.filter(p => p.category === cat.slug);
                  const revenue = catProducts.reduce((sum, p) => sum + p.price, 0);
                  return (
                    <div key={cat.id} className="text-center p-4 bg-secondary rounded-lg">
                      <img src={cat.image} alt={cat.name} className="w-12 h-12 rounded-full object-cover mx-auto mb-2" />
                      <p className="text-sm font-medium font-body">{cat.name}</p>
                      <p className="text-xs text-muted-foreground">{catProducts.length} items</p>
                      <p className="text-sm font-semibold text-primary mt-1">${revenue.toFixed(0)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {tab === "products" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg font-semibold">All Products ({products.length})</h3>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-body font-medium hover:opacity-90">+ Add Product</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b border-border">
                      <th className="pb-3 font-medium">Product</th>
                      <th className="pb-3 font-medium">Brand</th>
                      <th className="pb-3 font-medium">Category</th>
                      <th className="pb-3 font-medium">Price</th>
                      <th className="pb-3 font-medium">Rating</th>
                      <th className="pb-3 font-medium">Stock</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" />
                            <span className="font-medium text-foreground truncate max-w-[200px]">{p.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-muted-foreground">{p.brand}</td>
                        <td className="py-3"><span className="capitalize text-muted-foreground">{p.category}</span></td>
                        <td className="py-3 text-foreground font-medium">${p.price}</td>
                        <td className="py-3 text-foreground">{p.rating}</td>
                        <td className="py-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.inStock ? "bg-sage/20 text-sage" : "bg-accent/20 text-accent"}`}>
                            {p.inStock ? "In Stock" : "Out"}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 hover:bg-secondary rounded"><Eye size={14} /></button>
                            <button className="p-1.5 hover:bg-secondary rounded"><Edit size={14} /></button>
                            <button className="p-1.5 hover:bg-secondary rounded text-accent"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {tab === "orders" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold mb-6">All Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b border-border">
                      <th className="pb-3 font-medium">Order ID</th>
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(o => (
                      <tr key={o.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                        <td className="py-3 font-medium text-foreground">{o.id}</td>
                        <td className="py-3 text-foreground">{o.customer}</td>
                        <td className="py-3 text-foreground font-medium">${o.amount}</td>
                        <td className="py-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[o.status]}`}>{o.status}</span></td>
                        <td className="py-3 text-muted-foreground">{o.date}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 hover:bg-secondary rounded"><Eye size={14} /></button>
                            <button className="p-1.5 hover:bg-secondary rounded"><Edit size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {tab === "customers" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold mb-6">Customer Management</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b border-border">
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Email</th>
                      <th className="pb-3 font-medium">Orders</th>
                      <th className="pb-3 font-medium">Total Spent</th>
                      <th className="pb-3 font-medium">Joined</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCustomers.map(c => (
                      <tr key={c.name} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${c.name}`} alt={c.name} className="w-8 h-8 rounded-full bg-secondary" />
                            <span className="font-medium text-foreground">{c.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-muted-foreground">{c.name.toLowerCase().replace(" ", ".")}@email.com</td>
                        <td className="py-3 text-foreground">{c.orders}</td>
                        <td className="py-3 text-foreground font-medium">{c.spent}</td>
                        <td className="py-3 text-muted-foreground">Jan 2024</td>
                        <td className="py-3"><span className="text-xs px-2 py-1 rounded-full font-medium bg-sage/20 text-sage">Active</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

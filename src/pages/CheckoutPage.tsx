import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, ShieldCheck, CheckCircle } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shipping, setShipping] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "US",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shippingCost = totalPrice() > 100 ? 0 : 9.99;
  const tax = totalPrice() * 0.08;
  const total = totalPrice() + shippingCost + tax;

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground font-body text-lg">Your cart is empty</p>
        <Link to="/" className="text-primary font-medium hover:underline mt-4 inline-block">Continue Shopping</Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="container py-20 text-center max-w-lg mx-auto">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
        <h1 className="font-display text-3xl font-bold mb-3">Order Confirmed!</h1>
        <p className="text-muted-foreground font-body mb-2">Order #TH-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
        <p className="text-muted-foreground font-body mb-8">We'll send you a confirmation email with tracking details.</p>
        <Link to="/" className="inline-block py-3 px-8 bg-primary text-primary-foreground rounded-lg font-body font-medium hover:opacity-90">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    clearCart();
    setOrderPlaced(true);
    toast.success("Order placed successfully!");
  };

  const isShippingValid = shipping.firstName && shipping.lastName && shipping.email && shipping.address && shipping.city && shipping.state && shipping.zip;

  return (
    <div className="container py-8 max-w-6xl">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-body mb-6">
        <ArrowLeft size={16} /> Back
      </button>

      <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>

      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-8">
        {["Shipping", "Payment"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              (i === 0 && step === "shipping") || (i === 1 && step === "payment")
                ? "bg-primary text-primary-foreground"
                : i === 0 && step === "payment"
                ? "bg-green-500 text-white"
                : "bg-secondary text-muted-foreground"
            }`}>{i === 0 && step === "payment" ? "✓" : i + 1}</div>
            <span className="text-sm font-body font-medium">{s}</span>
            {i === 0 && <div className="w-12 h-px bg-border mx-2" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left - Forms */}
        <div className="lg:col-span-2">
          {step === "shipping" && (
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Truck size={20} className="text-primary" />
                <h2 className="font-display text-xl font-semibold">Shipping Address</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium font-body mb-1">First Name *</label>
                  <input value={shipping.firstName} onChange={e => setShipping({...shipping, firstName: e.target.value})}
                    className="w-full px-4 py-3 bg-secondary rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium font-body mb-1">Last Name *</label>
                  <input value={shipping.lastName} onChange={e => setShipping({...shipping, lastName: e.target.value})}
                    className="w-full px-4 py-3 bg-secondary rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Doe" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium font-body mb-1">Email *</label>
                  <input type="email" value={shipping.email} onChange={e => setShipping({...shipping, email: e.target.value})}
                    className="w-full px-4 py-3 bg-secondary rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium font-body mb-1">Phone</label>
                  <input type="tel" value={shipping.phone} onChange={e => setShipping({...shipping, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-secondary rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium font-body mb-1">Street Address *</label>
                <input value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})}
                  className="w-full px-4 py-3 bg-secondary rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="123 Main St, Apt 4" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium font-body mb-1">City *</label>
                  <input value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})}
                    className="w-full px-4 py-3 bg-secondary rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="New York" />
                </div>
                <div>
                  <label className="block text-sm font-medium font-body mb-1">State *</label>
                  <input value={shipping.state} onChange={e => setShipping({...shipping, state: e.target.value})}
                    className="w-full px-4 py-3 bg-secondary rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="NY" />
                </div>
                <div>
                  <label className="block text-sm font-medium font-body mb-1">ZIP Code *</label>
                  <input value={shipping.zip} onChange={e => setShipping({...shipping, zip: e.target.value})}
                    className="w-full px-4 py-3 bg-secondary rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="10001" />
                </div>
              </div>
              <button onClick={() => isShippingValid && setStep("payment")} disabled={!isShippingValid}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-body font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed mt-4">
                Continue to Payment
              </button>
            </div>
          )}

          {step === "payment" && (
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard size={20} className="text-primary" />
                <h2 className="font-display text-xl font-semibold">Payment Method</h2>
              </div>

              <div className="space-y-3">
                {[
                  { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, Amex" },
                  { id: "paypal", label: "PayPal", desc: "Pay with your PayPal account" },
                  { id: "cod", label: "Cash on Delivery", desc: "Pay when you receive" },
                ].map(m => (
                  <label key={m.id} className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                    paymentMethod === m.id ? "border-primary bg-primary/5" : "border-border hover:bg-secondary"
                  }`}>
                    <input type="radio" name="payment" value={m.id} checked={paymentMethod === m.id}
                      onChange={() => setPaymentMethod(m.id)} className="accent-primary" />
                    <div>
                      <p className="font-body font-medium text-sm">{m.label}</p>
                      <p className="text-xs text-muted-foreground">{m.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4 pt-4 border-t border-border">
                  <div>
                    <label className="block text-sm font-medium font-body mb-1">Card Number</label>
                    <input className="w-full px-4 py-3 bg-secondary rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="4242 4242 4242 4242" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium font-body mb-1">Expiry</label>
                      <input className="w-full px-4 py-3 bg-secondary rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium font-body mb-1">CVV</label>
                      <input className="w-full px-4 py-3 bg-secondary rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-4">
                <button onClick={() => setStep("shipping")} className="flex-1 py-3 border border-border rounded-lg font-body font-medium hover:bg-secondary">
                  Back
                </button>
                <button onClick={handlePlaceOrder} className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-body font-medium hover:opacity-90">
                  Place Order — ${total.toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
            <h2 className="font-display text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-3">
                  <img src={item.product.image} alt={item.product.name} className="w-14 h-16 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-body font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    <p className="text-sm font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2 text-sm font-body">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${totalPrice().toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shippingCost === 0 ? <span className="text-green-500">Free</span> : `$${shippingCost.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-semibold text-base border-t border-border pt-2 mt-2">
                <span>Total</span><span className="font-display">${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
              <ShieldCheck size={14} /> Secure checkout · SSL encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

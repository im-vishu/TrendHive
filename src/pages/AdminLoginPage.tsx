import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "@/store/useAdminStore";
import { Shield, ArrowLeft, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const AdminLoginPage = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdminStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(code)) {
      navigate("/admin");
    } else {
      setError("Invalid access code");
      setCode("");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm mx-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-body mb-6">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield size={28} className="text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Access</h1>
          <p className="text-sm text-muted-foreground font-body mt-2">Enter your secret access code</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 text-sm text-accent bg-accent/10 p-3 rounded-lg font-body">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium font-body mb-1.5">Access Code</label>
            <input
              type="password"
              value={code}
              onChange={e => { setCode(e.target.value); setError(""); }}
              placeholder="Enter secret code"
              className="w-full px-4 py-3 bg-secondary rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </div>
          <button type="submit" className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-body font-medium hover:opacity-90 transition-opacity">
            Access Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;

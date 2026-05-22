import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-display font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground font-body">Oops! Page not found</p>
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-body transition-colors mr-4">
          <ArrowLeft size={16} /> Go Back
        </button>
        <a href="/" className="text-primary underline hover:text-primary/90 font-body">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

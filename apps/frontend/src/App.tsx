import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { NewsletterPopup } from "@/components/NewsletterPopup";

// Public pages
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import OffersPage from "./pages/OffersPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

// Auth pages
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

// Account pages
import ProfilePage from "./pages/account/ProfilePage";
import OrdersPage from "./pages/account/OrdersPage";

// Checkout pages
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentCancelledPage from "./pages/PaymentCancelledPage";

// Search page
import SearchPage from "./pages/SearchPage";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Admin routes - without Header/Footer */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/produtos"
                  element={
                    <AdminRoute>
                      <AdminProducts />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/produtos/novo"
                  element={
                    <AdminRoute>
                      <AdminProductForm />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/produtos/:id"
                  element={
                    <AdminRoute>
                      <AdminProductForm />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/pedidos"
                  element={
                    <AdminRoute>
                      <AdminOrders />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/categorias"
                  element={
                    <AdminRoute>
                      <AdminCategories />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/cupons"
                  element={
                    <AdminRoute>
                      <AdminCoupons />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/configuracoes"
                  element={
                    <AdminRoute>
                      <AdminSettings />
                    </AdminRoute>
                  }
                />

                {/* Main site routes - with Header/Footer */}
                <Route
                  path="*"
                  element={
                    <div className="flex flex-col min-h-screen">
                      <Header />
                      <div className="flex-1">
                        <Routes>
                          {/* Public routes */}
                          <Route path="/" element={<Index />} />
                          <Route path="/busca" element={<SearchPage />} />
                          <Route path="/produto/:slug" element={<ProductPage />} />
                          <Route path="/categoria/:slug" element={<CategoryPage />} />
                          <Route path="/ofertas" element={<OffersPage />} />
                          <Route path="/sobre" element={<AboutPage />} />

                          {/* Auth routes */}
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/cadastro" element={<SignupPage />} />
                          <Route path="/recuperar-senha" element={<ForgotPasswordPage />} />
                          <Route path="/redefinir-senha" element={<ResetPasswordPage />} />

                          {/* Checkout routes */}
                          <Route
                            path="/checkout"
                            element={
                              <PrivateRoute>
                                <CheckoutPage />
                              </PrivateRoute>
                            }
                          />
                          <Route
                            path="/pedido-confirmado"
                            element={
                              <PrivateRoute>
                                <OrderConfirmationPage />
                              </PrivateRoute>
                            }
                          />
                          <Route
                            path="/pagamento/sucesso"
                            element={
                              <PrivateRoute>
                                <PaymentSuccessPage />
                              </PrivateRoute>
                            }
                          />
                          <Route
                            path="/pagamento/cancelado"
                            element={
                              <PrivateRoute>
                                <PaymentCancelledPage />
                              </PrivateRoute>
                            }
                          />

                          {/* Protected routes */}
                          <Route
                            path="/minha-conta"
                            element={
                              <PrivateRoute>
                                <ProfilePage />
                              </PrivateRoute>
                            }
                          />
                          <Route
                            path="/minha-conta/pedidos"
                            element={
                              <PrivateRoute>
                                <OrdersPage />
                              </PrivateRoute>
                            }
                          />

                          {/* 404 */}
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </div>
                      <Footer />
                      <CartDrawer />
                      <NewsletterPopup />
                    </div>
                  }
                />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

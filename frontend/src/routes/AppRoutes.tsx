import {  Route, Routes } from "react-router-dom";

import ProtectedRoute from "@/routes/ProtectedRoute";

import AppLayout from "@/layouts/AppLayout";

import DashboardPage from "@/pages/dashboard/DashboardPage";
import CustomersPage from "@/pages/customers/CustomersPage";
import ProductsPage from "@/pages/products/ProductsPage";
import InventoryPage from "@/pages/inventory/InventoryPage";
import ChallansPage from "@/pages/challans/ChallansPage";
import LoginPage from "@/pages/auth/LoginPage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";


export default function AppRoutes() {
  return (
    
      <Routes>
        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard */}
        <Route
           path="/"
           element={
             <ProtectedRoute
               roles={[
                 "ADMIN",
                 "SALES",
                 "WAREHOUSE",
                 "ACCOUNTS",
               ]}
             >
               <AppLayout>
                 <DashboardPage />
               </AppLayout>
             </ProtectedRoute>
           }
          />

        {/* Customers */}
        <Route
          path="/customers"
          element={
            <ProtectedRoute roles={["ADMIN", "SALES"]}>
              <AppLayout>
                <CustomersPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Products */}
        <Route
          path="/products"
          element={
            <ProtectedRoute roles={[
        "ADMIN",
        "WAREHOUSE",
      ]}>
              <AppLayout>
                <ProductsPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Inventory */}
      <Route
         path="/inventory"
         element={
           <ProtectedRoute roles={[
        "ADMIN",
        "WAREHOUSE",
      ]}>
             <AppLayout>
               <InventoryPage />
             </AppLayout>
           </ProtectedRoute>
          }
        />

        {/* Challans */}
        <Route
          path="/challans"
          element={
            <ProtectedRoute  roles={[
        "ADMIN",
        "SALES",
      ]}>
              <AppLayout>
                <ChallansPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    
  );
}
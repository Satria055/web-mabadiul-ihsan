"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import Alert from "@/components/ui/Alert"; // Pastikan path ini benar

type AlertType = "success" | "error" | "warning";

interface AlertContextType {
  showAlert: (message: string, type?: AlertType) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<{ show: boolean; message: string; type: AlertType }>({
    show: false,
    message: "",
    type: "success",
  });

  const showAlert = (message: string, type: AlertType = "success") => {
    setAlert({ show: true, message, type });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {/* Komponen Alert Global dirender di sini */}
      <Alert 
        isVisible={alert.show} 
        type={alert.type} 
        message={alert.message} 
        onClose={() => setAlert((prev) => ({ ...prev, show: false }))} 
      />
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}
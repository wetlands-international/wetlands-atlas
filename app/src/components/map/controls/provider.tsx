import React, { createContext, useContext, useState, ReactNode } from "react";

// Create the context
const PopoverContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  open: false,
  setOpen: () => {},
});

// Provider component
export const PopoverProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return <PopoverContext.Provider value={{ open, setOpen }}>{children}</PopoverContext.Provider>;
};

// Custom hook to use the Popover context
export const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopover must be used within a PopoverProvider");
  }
  return context;
};

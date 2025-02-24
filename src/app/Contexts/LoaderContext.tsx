"use client";

import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import Loader from "@/components/Loader/Loader";

interface LoaderProviderProps {
  setShowLoader: (value: boolean) => void;
}

const LoaderContext = createContext<LoaderProviderProps | undefined>(undefined);

export const LoaderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loader, setLoader] = useState(false);
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const setShowLoader = (value: boolean) => {
    setLoader(value);
  };

  return (
    <LoaderContext.Provider value={{ setShowLoader }}>
      {children}
      <Loader
        loading={loader}
        isFetching={isFetching}
        isMutating={isMutating}
      />
    </LoaderContext.Provider>
  );
};

export const useLoader = (): LoaderProviderProps => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};

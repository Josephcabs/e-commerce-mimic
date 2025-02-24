"use client";
import { useEffect, useState } from "react";

export interface LoaderProps {
  loading?: boolean;
  isMutating?: number;
  isFetching?: number;
}

export default function Loader({
  loading,
  isMutating,
  isFetching,
}: LoaderProps) {
  const [isShowingLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    setIsLoading(loading || !!isMutating || !!isFetching);
  }, [loading, isMutating, isFetching]);

  return (
    <>
      {isShowingLoading && (
        <div>
          <div className="flex items-center justify-center min-h-screen fixed inset-0 bg-opacity-50 bg-black z-50">
            <div className="border-t-4 border-red-600 border-solid w-16 h-16 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </>
  );
}

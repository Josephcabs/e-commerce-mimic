import { useState, useEffect } from "react";

export const usePagination = (totalItems: number, itemsPerPage: number) => {
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setTotalPage(Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return { totalPage, currentPage, paginate };
};

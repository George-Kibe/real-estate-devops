"use client";

import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";

const Pagination = ({ page, count }) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false); // Track client-side

  // Ensure we're in the browser
  useEffect(() => {
    setIsClient(true); // We are now on the client side
  }, []);

  const hasPrev = ITEMS_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEMS_PER_PAGE * (page - 1) + ITEMS_PER_PAGE < count;

  const changePage = (newPage) => {
    if (isClient) { // Ensure window is accessible
      //const params = new URLSearchParams(window.location.search);
      //params.set("page", newPage.toString());
      //router.push(`${window.location.pathname}?${params}`);
    }
  };

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={!hasPrev}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {
          changePage(page - 1);
        }}
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from(
          { length: Math.ceil(count / ITEMS_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex}
                className={`px-3 items-center justify-center p-2 rounded-xl ${
                  page === pageIndex ? "bg-blue-600" : ""
                }`}
                onClick={() => {
                  changePage(pageIndex);
                }}
              >
                <p className={`text-black ${
                  page === pageIndex ? "text-white" : ""
                }`}>{pageIndex}</p>
              </button>
            );
          }
        )}
      </div>
      <button
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!hasNext}
        onClick={() => {
          changePage(page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

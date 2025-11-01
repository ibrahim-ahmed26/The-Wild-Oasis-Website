"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "all";
  const router = useRouter();
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`);
  }
  return (
    <div className="flex items-center gap-1 border border-primary-800">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All Cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1-3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4-7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8-12 guests
      </Button>
    </div>
  );
  function Button({ filter, children, handleFilter, activeFilter }) {
    return (
      <button
        onClick={() => handleFilter(filter)}
        className={`px-5 py-2 text-xl capitalize hover:bg-primary-700 transition-colors ${
          activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
        }`}
      >
        {children}
      </button>
    );
  }
}

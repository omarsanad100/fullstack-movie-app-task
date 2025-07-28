import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchEntries } from "../components/utils/api";

// Custom hook for infinite loading of entries
export const useEntries = () => {
  return useInfiniteQuery({
    queryKey: ["entries"],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      fetchEntries(pageParam, 10),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any[], allPages) => {
      if (lastPage.length < 10) return undefined;
      return allPages.length + 1;
    },
  });
};

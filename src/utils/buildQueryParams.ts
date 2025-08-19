// utils/queryBuilder.ts

export interface QueryFilters {
  sort?: string[];
  categoryIds?: string[];
  languageIds?: string[];
  organizationIds?: string[];
  keywordIds?: string[];
  isCurrent?: boolean;
  search?: string;
}

export interface Pagination {
  page: number;
  limit: number;
}

export const buildQueryParams = (
  filters: QueryFilters,
  pagination: Pagination
): string => {
  const params = new URLSearchParams();
  filters.sort?.forEach((field) => {
    params.append("sort", field);
  });

  // categoryIds (multiple)
  filters.categoryIds?.forEach((id) =>
    params.append("categoryIds", id.toString())
  );

  // languageIds (multiple)
  filters.languageIds?.forEach((id) =>
    params.append("languageIds", id.toString())
  );

  // organizationIds (multiple)
  filters.organizationIds?.forEach((id) =>
    params.append("organizationIds", id.toString())
  );
  filters.keywordIds?.forEach((id) =>
    params.append("keywordIds", id.toString())
  );

  // isCurrent (boolean)
  if (typeof filters.isCurrent === "boolean") {
    params.append("isCurrent", filters.isCurrent.toString());
  }

  // search 
  if (filters.search) {
    params.append("search", filters.search);
  }
  
  // pagination
  params.append("page", pagination.page.toString());
  params.append("limit", pagination.limit.toString());

  return params.toString();
};

// utils/queryBuilder.ts

export interface QueryFilters {
  sort?: string[];
  categoryIds?: string[];
  level?: string[];
  tagIds?: string[];
  languageIds?: string[];
  organizationIds?: string[];
  keywordIds?: string[];
  isCurrent?: boolean;
  search?: string;
  featured?: boolean;
  IsSuggested?: boolean;
}

export interface Pagination {
  page?: number;
  limit?: number;
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
  filters.level?.forEach((id) => params.append("levels", id.toString()));
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
  filters.tagIds?.forEach((id) => params.append("tagIds", id.toString()));

  // isCurrent (boolean)
  if (typeof filters.isCurrent === "boolean") {
    params.append("isCurrent", filters.isCurrent.toString());
  }
  if (filters.featured) params.append("featured", filters.featured.toString());
  if (filters.IsSuggested) params.append("isSuggested", filters.IsSuggested.toString());

  // search
  if (filters.search) {
    params.append("search", filters.search);
  }

  // pagination
  if (pagination?.page !== undefined) {
    params.append("page", pagination.page.toString());
  }
  if (pagination?.limit !== undefined) {
    params.append("limit", pagination.limit.toString());
  }

  return params.toString();
};

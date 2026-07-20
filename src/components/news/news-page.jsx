"use client";

import { useCallback, useEffect, useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdOutlineArrowOutward } from "react-icons/md";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReusableBanner } from "@/components/reusable-banner";
import { SearchBar } from "@/components/search-bar";
import { Pagination } from "@/components/pagination";
import { Title } from "@/components/title-text";
import { newsBanner } from "@/lib/newsData";
import {
  useArticleCategories,
  useArticles,
  useHighlightedArticles,
} from "@/hooks/useArticles";
import { FeaturedCarousel } from "./featured-post";
import { NewsCard } from "./news-card";

const PAGE_SIZE = 6;

const SORT_OPTIONS = [
  { value: "publishedAt-desc", label: "Newest" },
  { value: "publishedAt-asc", label: "Oldest" },
  { value: "title-asc", label: "Title A–Z" },
  { value: "title-desc", label: "Title Z–A" },
  { value: "updatedAt-desc", label: "Recently updated" },
];

function NewsGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-main overflow-hidden bg-lightColor dark:bg-secondaryDark animate-pulse"
        >
          <div className="aspect-[4/3] bg-neutral-200 dark:bg-neutral-800" />
          <div className="p-4 md:p-5 space-y-3">
            <div className="h-3 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-5 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-4 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function NewsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const activeCategory = searchParams.get("category") || "All";
  const searchQuery = searchParams.get("q") || "";
  const currentPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const sort = searchParams.get("sort") || "publishedAt-desc";
  const activeTag = searchParams.get("tag") || "";

  const isSearching = searchQuery.trim().length > 0;

  const updateParams = useCallback(
    (patch, { resetPage = true } = {}) => {
      const next = new URLSearchParams(searchParams.toString());

      Object.entries(patch).forEach(([key, value]) => {
        if (
          value === undefined ||
          value === null ||
          value === "" ||
          value === "All"
        ) {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });

      if (resetPage && patch.page === undefined) {
        next.delete("page");
      }

      const qs = next.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [pathname, router, searchParams]
  );

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useArticleCategories();

  const {
    data: highlightedPosts,
    loading: highlightedLoading,
  } = useHighlightedArticles(5, {
    enabled: !isSearching && !activeTag,
    category: activeCategory === "All" ? undefined : activeCategory,
  });

  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
    pagination,
  } = useArticles({
    page: currentPage,
    limit: PAGE_SIZE,
    highlighted: isSearching || activeTag ? undefined : false,
    category: activeCategory === "All" ? undefined : activeCategory,
    q: searchQuery || undefined,
    tag: activeTag || undefined,
    sort,
  });

  const categoryTabs = useMemo(() => {
    const tabs = [{ id: "All", label: "All" }];
    categories.forEach((cat) => {
      tabs.push({ id: cat.id, label: cat.label });
    });
    return tabs;
  }, [categories]);

  useEffect(() => {
    if (categoriesLoading || activeCategory === "All") return;
    const stillValid = categories.some((cat) => cat.id === activeCategory);
    if (!stillValid) {
      updateParams({ category: "All" });
    }
  }, [activeCategory, categories, categoriesLoading, updateParams]);

  const handleSearch = useCallback(
    (query) => {
      updateParams({ q: query.trim() });
    },
    [updateParams]
  );

  const handleCategoryChange = useCallback(
    (categoryId) => {
      updateParams({ category: categoryId });
    },
    [updateParams]
  );

  const handleSortChange = useCallback(
    (value) => {
      updateParams({ sort: value === "publishedAt-desc" ? "" : value });
    },
    [updateParams]
  );

  const handleTagClear = useCallback(() => {
    updateParams({ tag: "" });
  }, [updateParams]);

  const handlePageChange = useCallback(
    (page) => {
      updateParams({ page: page <= 1 ? "" : page }, { resetPage: false });
      document.getElementById("news-articles")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    [updateParams]
  );

  const showFeatured =
    !isSearching &&
    !activeTag &&
    !highlightedLoading &&
    highlightedPosts.length > 0;

  const loading =
    postsLoading || (categoriesLoading && categories.length === 0);
  const error = postsError || categoriesError;
  const showEmptyState =
    !loading && !error && posts.length === 0 && !showFeatured;

  return (
    <>
      <ReusableBanner
        imageSrc={newsBanner.imageSrc}
        imageAlt={newsBanner.imageAlt}
        title={newsBanner.title}
        titleHighlight={newsBanner.titleHighlight}
        description={newsBanner.description}
        buttonText="Explore"
        buttonIcon={<MdOutlineArrowOutward className="rotate-90" />}
        sectionClassName="bg-darkColor dark:bg-lightColor"
        titleClassName="invert"
        descriptionClassName="invert"
      />

      <section
        id="news-articles"
        className="margin spacing space-y-8 md:space-y-10"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8">
            <div className="shrink-0">
              <Title
                className="mb-2 text-mainColor dark:text-otherColor"
                icon={false}
              >
                Latest
              </Title>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tighter">
                Articles & Updates
              </h2>
            </div>

            <div
              className="md:max-w-[55%] min-w-0 overflow-x-auto no-scrollbar pb-0.5 -mx-1 px-1 md:mx-0 md:px-0"
              role="tablist"
              aria-label="Filter by category"
            >
              <div className="flex w-max flex-nowrap gap-2 md:ml-auto">
                {categoryTabs.map((category) => {
                  const isActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`shrink-0 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-main transition-colors duration-200 ${
                        isActive
                          ? "bg-mainColor text-white dark:bg-otherColor dark:text-otherColorDark"
                          : "bg-lightColor dark:bg-secondaryDark text-muted-foreground hover:text-foreground border border-transparent dark:border-white/5"
                      }`}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-start">
            <div className="flex-1 w-full min-w-0">
              <SearchBar
                className="bg-lightColor/80 dark:bg-secondaryDark/80 backdrop-blur-sm"
                value={searchQuery}
                onSearch={handleSearch}
                searchTerm={searchQuery}
                placeholder="Search articles, categories, authors..."
                searchStats={{
                  totalResults: pagination?.total || 0,
                }}
              />
            </div>

            <label className="relative shrink-0 w-full sm:w-auto sm:min-w-[10.5rem]">
              <span className="sr-only">Sort by</span>
              <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                aria-label="Sort articles"
                className="peer h-9 w-full appearance-none rounded-full border border-neutral-200/80 dark:border-white/10 bg-lightColor/80 dark:bg-secondaryDark/80 pl-3.5 pr-9 text-xs font-semibold uppercase tracking-wider outline-none transition-[border-color,box-shadow] focus-visible:border-mainColor/40 focus-visible:ring-2 focus-visible:ring-mainColor/15 dark:focus-visible:border-otherColor/40 dark:focus-visible:ring-otherColor/15 cursor-pointer"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
            </label>
          </div>

          {activeTag && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Tag:</span>
              <button
                type="button"
                onClick={handleTagClear}
                className="px-2.5 py-1 rounded-full bg-mainColor/10 dark:bg-otherColor/15 text-mainColor dark:text-otherColor text-xs font-semibold uppercase tracking-wider"
              >
                {activeTag} ×
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="rounded-main border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
            <p className="text-red-800 dark:text-red-200 text-sm">
              Failed to load articles: {error}
            </p>
            <Button
              variant="outline"
              className="mt-3"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        )}

        {showFeatured && <FeaturedCarousel posts={highlightedPosts} />}

        {loading ? (
          <NewsGridSkeleton />
        ) : posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {posts.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>

            {pagination && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                totalItems={pagination.total}
                itemsPerPage={pagination.limit || PAGE_SIZE}
                itemLabel="articles"
                showInfo
              />
            )}
          </>
        ) : (
          showEmptyState && (
            <div className="py-16 text-center rounded-main bg-lightColor dark:bg-secondaryDark">
              <p className="text-muted-foreground">
                {isSearching || activeTag
                  ? "No articles match your filters."
                  : "No articles in this category yet."}
              </p>
            </div>
          )
        )}
      </section>
    </>
  );
}

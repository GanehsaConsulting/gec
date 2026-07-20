"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { ReusableBanner } from "@/components/reusable-banner";
import { SearchBar } from "@/components/search-bar";
import { Pagination } from "@/components/pagination";
import { Title } from "@/components/title-text";
import { paginateNews, searchNews } from "@/lib/newsData";
import { FeaturedCarousel } from "./featured-post";
import { NewsCard } from "./news-card";

const PAGE_SIZE = 6;

export function NewsPage({ banner, categories, posts, featuredPosts = [] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const isSearching = searchQuery.trim().length > 0;

  const visibleFeatured = useMemo(() => {
    if (isSearching) return [];
    if (activeCategory === "All") return featuredPosts;
    return featuredPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory, featuredPosts, isSearching]);

  const filteredPosts = useMemo(() => {
    const featuredSlugs = new Set(
      isSearching ? [] : visibleFeatured.map((post) => post.slug)
    );

    let list =
      activeCategory === "All"
        ? posts
        : posts.filter((post) => post.category === activeCategory);

    list = list.filter((post) => !featuredSlugs.has(post.slug));
    list = searchNews(list, searchQuery);

    return list;
  }, [activeCategory, posts, visibleFeatured, searchQuery, isSearching]);

  const { items: paginatedPosts, pagination } = useMemo(
    () => paginateNews(filteredPosts, currentPage, PAGE_SIZE),
    [filteredPosts, currentPage]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    document.getElementById("news-articles")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const showEmptyState =
    paginatedPosts.length === 0 && visibleFeatured.length === 0;

  return (
    <>
      <ReusableBanner
        imageSrc={banner.imageSrc}
        imageAlt={banner.imageAlt}
        title={banner.title}
        titleHighlight={banner.titleHighlight}
        description={banner.description}
        buttonText="Explore"
        buttonIcon={<MdOutlineArrowOutward className="rotate-90" />}
        sectionClassName="bg-darkColor dark:bg-lightColor"
        titleClassName="invert"
        descriptionClassName="invert"
      />

      <section id="news-articles" className="margin spacing space-y-8 md:space-y-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
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
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Filter by category"
            >
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-main transition-colors duration-200 ${
                      isActive
                        ? "bg-mainColor text-white dark:bg-otherColor dark:text-otherColorDark"
                        : "bg-lightColor dark:bg-secondaryDark text-muted-foreground hover:text-foreground border border-transparent dark:border-white/5"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <SearchBar
            className="bg-lightColor/80 dark:bg-secondaryDark/80 backdrop-blur-sm"
            value={searchQuery}
            onSearch={handleSearch}
            searchTerm={searchQuery}
            placeholder="Search articles, categories, authors..."
            searchStats={{ totalResults: filteredPosts.length }}
          />
        </div>

        {visibleFeatured.length > 0 && (
          <FeaturedCarousel posts={visibleFeatured} />
        )}

        {paginatedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {paginatedPosts.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>

            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              totalItems={pagination.total}
              itemsPerPage={PAGE_SIZE}
              itemLabel="articles"
              showInfo
            />
          </>
        ) : (
          showEmptyState && (
            <div className="py-16 text-center rounded-main bg-lightColor dark:bg-secondaryDark">
              <p className="text-muted-foreground">
                {isSearching
                  ? "No articles match your search."
                  : "No articles in this category yet."}
              </p>
            </div>
          )
        )}
      </section>
    </>
  );
}

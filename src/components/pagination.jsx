"use client"
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2 } from "lucide-react";

export const Pagination = ({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    totalItems = 0,
    itemsPerPage = 12,
    showInfo = true,
    maxVisible = 5,
    mode = "numbers", // "numbers" or "loadmore"
    onLoadMore,
    isLoading = false,
    hasMore = true
}) => {
    // Load More Mode
    if (mode === "loadmore") {
        const loadedItems = Math.min(currentPage * itemsPerPage, totalItems);
        const isAllLoaded = loadedItems >= totalItems || !hasMore;

        return (
            <div className="flex flex-col items-center gap-4 py-4">
                {/* Info */}
                {showInfo && totalItems > 0 && (
                    <div className="text-sm text-muted-foreground" key={`info-${currentPage}`}>
                        Menampilkan <span className="font-medium text-foreground">{loadedItems}</span> dari{" "}
                        <span className="font-medium text-foreground">{totalItems}</span> produk
                    </div>
                )}

                {/* Load More Button */}
                {!isAllLoaded && (
                    <Button
                        onClick={() => {
                            if (onLoadMore) {
                                onLoadMore(currentPage + 1);
                            } else {
                                onPageChange(currentPage + 1);
                            }
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Memuat...
                            </>
                        ) : (
                            "Load More"
                        )}
                    </Button>
                )}

                {/* All Loaded Message */}
                {isAllLoaded && totalItems > 0 && (
                    <div className="text-sm text-muted-foreground">
                        Semua produk telah dimuat
                    </div>
                )}
            </div>
        );
    }

    // Numbers Mode (Default)
    if (totalPages <= 1) return null;

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getPageNumbers = () => {
        const pages = [];
        const halfVisible = Math.floor(maxVisible / 2);
        
        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();
    const showFirstPage = pageNumbers[0] > 1;
    const showLastPage = pageNumbers[pageNumbers.length - 1] < totalPages;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="flex flex-col items-center gap-4 py-4">
            {/* Info */}
            {showInfo && totalItems > 0 && (
                <div className="text-sm text-muted-foreground" key={`info-numbers-${currentPage}`}>
                    Menampilkan <span className="font-medium text-foreground">{startItem}-{endItem}</span> dari{" "}
                    <span className="font-medium text-foreground">{totalItems}</span> produk
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex items-center gap-1">
                {/* First Page */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="h-9 w-9"
                    aria-label="First page"
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                {/* Previous Page */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-9 w-9"
                    aria-label="Previous page"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* First Page Number (if not in range) */}
                {showFirstPage && (
                    <>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(1)}
                            className="h-9 w-9 p-0"
                        >
                            1
                        </Button>
                        {pageNumbers[0] > 2 && (
                            <span className="px-2 text-muted-foreground">...</span>
                        )}
                    </>
                )}

                {/* Page Numbers */}
                {pageNumbers.map((page) => (
                    <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={`h-9 w-9 p-0 ${
                            currentPage === page 
                                ? 'bg-mainColorLight dark:bg-mainColorDark text-white' 
                                : ''
                        }`}
                    >
                        {page}
                    </Button>
                ))}

                {/* Last Page Number (if not in range) */}
                {showLastPage && (
                    <>
                        {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                            <span className="px-2 text-muted-foreground">...</span>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(totalPages)}
                            className="h-9 w-9 p-0"
                        >
                            {totalPages}
                        </Button>
                    </>
                )}

                {/* Next Page */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-9 w-9"
                    aria-label="Next page"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Last Page */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="h-9 w-9"
                    aria-label="Last page"
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>

            {/* Mobile Info */}
            <div className="text-xs text-muted-foreground sm:hidden">
                Halaman {currentPage} dari {totalPages}
            </div>
        </div>
    );
};
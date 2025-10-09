"use client"
import { Button } from "./ui/button";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const Sidebar = ({
    divisions = [],
    selectedDivision = '',
    onDivisionChange,
    onClearFilters
}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const hasActiveFilters = selectedDivision !== '';

    const handleDivisionClick = (divisionName) => {
        if (selectedDivision === divisionName) {
            onDivisionChange('');
        } else {
            onDivisionChange(divisionName);
        }
    };

    return (
        <div className="border w-full bg-lightColor dark:bg-darkColor rounded-main p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    <h3 className="font-semibold">Filter</h3>
                </div>
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearFilters}
                        className="h-8 text-xs"
                    >
                        <X className="h-3 w-3 mr-1" />
                        Reset
                    </Button>
                )}
            </div>

            {/* Division Filter */}
            <div className="space-y-2">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center justify-between w-full text-sm font-medium hover:text-mainColorLight dark:hover:text-mainColorDark transition-colors"
                >
                    <span>Pilih Divisi</span>
                    {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                    ) : (
                        <ChevronDown className="h-4 w-4" />
                    )}
                </button>

                {isExpanded && (
                    <div className="space-y-2">
                        <button
                            onClick={() => onDivisionChange('')}
                            className={`px-3 py-2 flex justify-start items-center gap-2 rounded-third cursor-pointer group w-full text-left transition-all duration-200 ${!selectedDivision
                                ? 'bg-mainColor dark:bg-secondaryColor text-white shadow-sm'
                                : 'bg-white dark:bg-black text-black dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-700'
                                }`}
                        >
                            <span className={`text-sm font-medium ${!selectedDivision
                                ? ''
                                : 'group-hover:text-mainColorLight dark:group-hover:text-mainColorDark'
                                }`}>
                                Semua Divisi
                            </span>
                        </button>

                        {divisions.length === 0 ? (
                            <p className="text-xs text-muted-foreground pl-2 py-2">Loading divisions...</p>
                        ) : (
                            divisions.map((divisionData, index) => {
                                const divisionName = divisionData.division || divisionData;
                                let productCount = 0;
                                if (divisionData.products) {
                                    productCount = divisionData.products.reduce((total, product) => {
                                        if (product.hasVariants && product.variants?.length > 0) {
                                            return total + product.variants.length;
                                        }
                                        return total + 1;
                                    }, 0);
                                } else {
                                    productCount = divisionData.count || 0;
                                }
                                const isActive = selectedDivision === divisionName;

                                return (
                                    <button
                                        key={divisionName || index}
                                        onClick={() => handleDivisionClick(divisionName)}
                                        className={`px-2 py-2 flex items-center justify-start gap-2 rounded-third cursor-pointer group w-full text-left transition-all duration-200 ${isActive
                                            ? 'bg-mainColor dark:bg-secondaryColor text-white shadow-sm'
                                            : 'bg-white dark:bg-black text-black dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-700'
                                            }`}
                                    >
                                        {productCount > 0 && (
                                            <span className={`aspect-square flex items-center justify-center text-xs px-2 py-0.5 rounded-full min-w-[28px] ${isActive
                                                ? 'bg-white/20 text-white font-semibold'
                                                : 'bg-neutral-100 dark:bg-neutral-700 text-muted-foreground'
                                                }`}>
                                                {productCount}
                                            </span>
                                        )}
                                        <span className={`flex items-center gap-2 line-clamp-1 text-sm ${isActive
                                            ? 'font-medium'
                                            : 'group-hover:text-mainColorLight dark:group-hover:text-mainColorDark'
                                            }`}>
                                            {divisionName}
                                        </span>
                                    </button>
                                );
                            })
                        )}
                    </div>
                )}
            </div>

            {/* Active Filter Info */}
            {hasActiveFilters && (
                <div className="pt-3 border-t">
                    <div className="text-xs text-muted-foreground mb-2">Filter Aktif:</div>
                    <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 bg-mainColorLight/10 dark:bg-mainColorDark/10 text-mainColorLight dark:text-mainColorDark px-2 py-1 rounded-full text-xs font-medium">
                            {selectedDivision}
                            <Button
                                variant={"destructive"}
                                size={"xs"}
                                onClick={() => onDivisionChange('')}
                                className="hover:bg-mainColorLight/20 dark:hover:bg-mainColorDark/20 rounded-full p-0.5 transition-colors"
                                aria-label="Remove filter"
                            >
                                <X className="size-3" />
                            </Button>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
"use client"
import { Button } from "./ui/button";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { TbFilter } from "react-icons/tb";
import { RiApps2AiFill } from "react-icons/ri";
import { FaDotCircle } from "react-icons/fa";

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
        <div className="w-full h-full p-4 bg-lightColor/50 dark:bg-darkColor/50 backdrop-blur-md rounded-main border border-neutral-500/10 space-y-2">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between w-full gap-2 text-sm">
                    <h3 className="font-semibold">Browse By Divisions</h3>
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
            <div className="space-y-2 pl-4">
                <button
                    onClick={() => onDivisionChange('')}
                    className={`py-1 flex justify-between items-center gap-2 rounded-third cursor-pointer group w-full text-left transition-all duration-200 relative
                                ${!selectedDivision ? 'font-medium' : 'font-base'}`}
                >
                    <div className={`${!selectedDivision ? "block" : "hidden"} w-[2px] h-9 bg-other1 absolute -left-4.5 top-1/2 transform -translate-y-1/2`}></div>

                    <span className={`text-sm group-hover:text-other1 group-hover:font-bold duration-300`}>
                        Semua Divisi
                    </span>

                    <span className={` ${!selectedDivision ? 'bg-other1/20' : 'bg-lightColor'} aspect-square flex items-center justify-center text-xs px-2 py-0.5 rounded-full min-w-[28px] font-semibold`}>
                        <RiApps2AiFill className="h-3.5 w-3.5" />
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
                                className={`py-1 flex justify-between items-center gap-2 rounded-third cursor-pointer group w-full text-left transition-all duration-200 relative
                                ${!isActive ? 'font-medium' : 'font-base'}`}
                            >
                                <div className={`${isActive ? "block" : "hidden"} w-[2px] h-9 bg-other1 absolute -left-4.5 top-1/2 transform -translate-y-1/2`}></div>

                                <span className={`flex items-center gap-2 line-clamp-1 text-sm ${isActive
                                    ? 'font-medium'
                                    : 'group-hover:text-mainColorLight dark:group-hover:text-mainColorDark'
                                    }`}>
                                    {divisionName}
                                </span>
                                {productCount > 0 && (
                                    <span className={` ${isActive ? 'bg-other1/20' : 'bg-lightColor dark:bg-darkColor'} aspect-square flex items-center justify-center text-xs px-2 py-0.5 rounded-full min-w-[28px] font-semibold`}>
                                        {productCount}
                                    </span>
                                )}
                            </button>
                        );
                    })
                )}
            </div>

            {/* Active Filter Info */}
            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-lightColor inline-flex items-center gap-1 text-mainColorLight dark:text-mainColorDark pl-2 pr-1 py-1 rounded-full text-xs font-medium">
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
            )}
        </div>
    );
};
"use client"
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, X } from 'lucide-react';
import { MdClear } from 'react-icons/md';

export const SearchBar = ({
  value = '',
  onSearch,
  placeholder = "Cari Nama Produk, Kategori",
  searchTerm = '',
  showClearButton = true,
  searchStats = { totalResults: 0, searchTime: 0 },
  className = "",
  classNameButton = ""
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  function handleSubmit(e) {
    e.preventDefault();
    if (onSearch) onSearch(inputValue.trim());
  }

  function handleClear() {
    setInputValue('');
    if (onSearch) onSearch('');
  }

  const isSearchActive = searchTerm.trim() !== '';

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-20 h-4 w-4" />
            <Input
              type="text"
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              aria-label="Search input"
              className={`${className} pl-10 ${isSearchActive ? 'ring-2 ring-mainColorLight/20 border-mainColorLight dark:border-mainColorDark' : ''}`}
            />
            {showClearButton && inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors`}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            variant={"glass"}
            type="submit"
            disabled={!inputValue.trim()}
            className={`${classNameButton} min-w-[80px] backdrop-blur-sm bg-primary/80 text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/90 rounded-full h-9 px-4 py-2 cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium`}
          >
            Cari
          </button>
        </div>
      </form>

      {isSearchActive && (
        <div className="text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 bg-white/50 rounded-full pr-3 pl-1 py-1 backdrop-blur-sm">
              <span className="flex items-center justify-center gap-1 bg-blue-100/70 dark:bg-blue-900/70 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                <Search className="h-3 w-3" />
                Mencari: <span className="font-medium">"{searchTerm}"</span>
              </span>
              {searchStats.totalResults > 0 && (
                <span className="text-xs">
                  ({searchStats.totalResults} hasil)
                </span>
              )}
            </div>
            <button
              onClick={handleClear}
              className="text-xs text-darkColor/70 dark:text-lightColor/70 hover:underline px-2 py-1 bg-red-200/30 dark:bg-red-900/30 backdrop-blur-sm rounded-full flex items-center gap-1"
            >
              <MdClear /> Hapus pencarian
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
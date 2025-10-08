"use client"
import React from 'react';
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Search, X } from 'lucide-react'

export const SearchBar = ({
  value = '',
  onSearch,
  placeholder = "Cari Nama Layanan, Kategori",
  searchTerm = '', // Current active search term
  showClearButton = true, // Optional: show clear button
  searchStats = { totalResults: 0, searchTime: 0, suggestions: [] }, // Search statistics
  className = ""
}) => {
  const [inputValue, setInputValue] = useState(value)

  // Sync prop value ke local state jika ada perubahan dari parent
  useEffect(() => {
    setInputValue(value)
  }, [value])

  function handleSubmit(e) {
    e.preventDefault()
    if (onSearch) onSearch(inputValue.trim())
  }

  function handleClear() {
    setInputValue('')
    if (onSearch) onSearch('')
  }

  // Check if we're in search mode
  const isSearchActive = searchTerm.trim() !== ''

  return (
    <div className={`space-y-3`}>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              aria-label="Search input"
              className={`${className} pl-10 ${isSearchActive ? 'ring-2 ring-mainColorLight/20 border-mainColorLight' : ''}`}
            />
            {showClearButton && inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Button
            type="submit"
            disabled={!inputValue.trim()} // Disable jika input kosong
            className="min-w-[80px]"
          >
            Cari
          </Button>
        </div>
      </form>

      {/* Search Status dan Info */}
      {isSearchActive && (
        <div className="text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2">
              <Search className="h-3 w-3" />
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs">
                Mencari: <span className="font-medium">"{searchTerm}"</span>
              </span>

            </span>
            <button
              onClick={handleClear}
              className="text-xs underline hover:no-underline"
            >
              Hapus pencarian
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
# useProducts Hook Documentation

Dokumentasi lengkap untuk custom React hooks yang digunakan untuk fetch data products dari API.

## 📚 Daftar Isi

- [Instalasi](#instalasi)
- [Hook yang Tersedia](#hook-yang-tersedia)
- [Parameter & Options](#parameter--options)
- [Cara Penggunaan](#cara-penggunaan)
- [Contoh Lengkap](#contoh-lengkap)
- [API Response Format](#api-response-format)
- [Troubleshooting](#troubleshooting)

---

## Instalasi

```javascript
import { 
  useProducts, 
  useProduct, 
  useCategorizedProducts,
  useCategorizedProduct,
  useProductsByDivision,
  useProductSearch 
} from '@/hooks/useProducts';
```

---

## Hook yang Tersedia

| Hook | Deskripsi | Endpoint API | Use Case |
|------|-----------|--------------|----------|
| `useProducts()` | Fetch semua products dengan filter | `/api/products` | List products, filter, pagination |
| `useProduct()` | Fetch single product by ID/slug | `/api/products` | Detail page, single product |
| `useCategorizedProducts()` | Fetch products dengan variants | `/api/products/categorized` | Products dengan variasi |
| `useCategorizedProduct()` | Fetch single product full details | `/api/products/categorized/detail` | Detail page dengan variants |
| `useProductsByDivision()` | Fetch products grouped by division | `/api/products/division` | Homepage dengan section division |
| `useProductSearch()` | Search products dengan debounce | `/api/products` | Search bar, autocomplete |

---

## Parameter & Options

### Common Options (Semua Hook)

```typescript
{
  // 🎯 Endpoint Configuration
  endpoint?: string
  // Options: 'products' | 'categorized' | 'detail' | 'categorized/detail' | 'products/division'
  
  // 🔍 Identifier
  id?: string                    // Product ID
  slug?: string                  // Product slug (URL-friendly)
  
  // 🎚️ Filters
  search?: string                // Search query
  published?: boolean            // Filter published only (true/false)
  priority?: boolean             // Filter priority products (true/false)
  category?: string              // Filter by category name
  division?: string              // Filter by division name ⭐
  
  // 📊 Sorting
  sortBy?: string                // Sort field
  // Options: 'id' | 'name' | 'price' | 'category' | 'division'
  order?: string                 // Sort order
  // Options: 'asc' | 'desc'
  
  // 📄 Pagination
  page?: number                  // Page number (default: 1)
  limit?: number                 // Items per page (default: 10)
  
  // 💰 Price Range
  minPrice?: number              // Minimum price
  maxPrice?: number              // Maximum price
  
  // ⚙️ Control
  enabled?: boolean              // Auto fetch on mount (default: true)
  debug?: boolean                // Debug mode for logging
}
```

### Return Values

```typescript
{
  data: any | null               // Product data (array atau object)
  loading: boolean               // Loading state
  error: string | null           // Error message jika ada
  pagination: {                  // Pagination info (jika ada)
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  } | null
  refetch: () => void           // Function untuk manual refetch
}
```

---

## Cara Penggunaan

### 1️⃣ Basic Usage - Fetch All Products

Cara paling sederhana untuk fetch semua products:

```javascript
import { useProducts } from '@/hooks/useProducts';

export default function ProductsPage() {
  const { data, loading, error } = useProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {data?.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

**API Call:**
```
GET http://localhost:3000/api/products
```

---

### 2️⃣ Filter by Division ⭐

**Use Case:** Halaman products berdasarkan division dari URL

```javascript
'use client'
import { useProducts } from '@/hooks/useProducts';
import { usePathname } from 'next/navigation';

export default function ProductByDivisionPage() {
  const pathname = usePathname();
  
  // Extract division dari URL: /products/infrastruktur
  const division = pathname.split('/').filter(x => x)[1];
  
  const { data, loading, error } = useProducts({
    division: division,        // ⭐ Gunakan 'division' (singular)
    published: true,
    sortBy: 'name',
    order: 'asc'
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      <h1 className="capitalize">{division}</h1>
      <div className="grid grid-cols-3 gap-4">
        {data?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
```

**API Call:**
```
GET http://localhost:3000/api/products?division=Infrastruktur&published=true&sortBy=name&order=asc
```

---

### 3️⃣ Single Product by ID atau Slug

```javascript
import { useProduct } from '@/hooks/useProducts';

// Fetch by ID
export default function ProductDetailPage() {
  const { data: product, loading } = useProduct('123');
  
  if (loading) return <p>Loading...</p>;
  
  return (
    <div>
      <h1>{product?.name}</h1>
      <p>{product?.description}</p>
    </div>
  );
}

// Fetch by Slug
export default function ProductDetailPage({ params }) {
  const { data: product } = useProduct('laptop-asus-vivobook');
  
  return <ProductDetail product={product} />;
}

// Dengan detailed info
export default function ProductDetailPage() {
  const { data: product } = useProduct('123', { 
    detailed: true 
  });
  
  return <ProductDetail product={product} />;
}
```

**API Calls:**
```
GET /api/products?id=123
GET /api/products?slug=laptop-asus-vivobook
GET /api/products/detail?id=123
```

---

### 4️⃣ Search dengan Debounce

**Use Case:** Search bar dengan auto-complete

```javascript
import { useProductSearch } from '@/hooks/useProducts';

export default function SearchPage() {
  const { 
    data, 
    loading, 
    query, 
    setQuery, 
    isSearching 
  } = useProductSearch('', {
    debounceMs: 500,      // Delay 500ms sebelum search
    minLength: 3,         // Min 3 karakter untuk search
    published: true,
    limit: 10
  });

  return (
    <div>
      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="border rounded px-4 py-2"
      />
      
      {isSearching && <p className="text-gray-500">Searching...</p>}
      
      {query.length >= 3 && (
        <div className="mt-4">
          {data?.map(product => (
            <div key={product.id} className="p-2 hover:bg-gray-100">
              {product.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

### 5️⃣ Multiple Filters

**Use Case:** Advanced filter page

```javascript
export default function FilteredProductsPage() {
  const [filters, setFilters] = useState({
    category: 'Laptop',
    division: 'Infrastruktur',
    minPrice: 5000000,
    maxPrice: 15000000
  });

  const { data, loading, pagination } = useProducts({
    ...filters,
    published: true,
    sortBy: 'price',
    order: 'asc',
    page: 1,
    limit: 20
  });

  return (
    <div>
      {/* Filter UI */}
      <FilterSidebar filters={filters} setFilters={setFilters} />
      
      {/* Products Grid */}
      <div className="grid grid-cols-4 gap-4">
        {data?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Pagination Info */}
      {pagination && (
        <p>
          Showing {data?.length} of {pagination.total} products
        </p>
      )}
    </div>
  );
}
```

**API Call:**
```
GET /api/products?category=Laptop&division=Infrastruktur&minPrice=5000000&maxPrice=15000000&published=true&sortBy=price&order=asc&page=1&limit=20
```

---

### 6️⃣ Products Grouped by Division

**Use Case:** Homepage dengan section per division

```javascript
import { useProductsByDivision } from '@/hooks/useProducts';

export default function HomePage() {
  const { data: divisions, loading } = useProductsByDivision({
    published: true,
    priority: true,
    limit: 8
  });

  if (loading) return <div>Loading...</div>;

  return (
    <main>
      {divisions?.map(division => (
        <section key={division.division} className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            {division.division}
          </h2>
          
          <div className="grid grid-cols-4 gap-6">
            {division.products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <a href={`/products/${division.division.toLowerCase()}`}>
            View All {division.division} Products →
          </a>
        </section>
      ))}
    </main>
  );
}
```

---

### 7️⃣ Pagination

**Use Case:** Products list dengan pagination

```javascript
import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';

export default function PaginatedProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const { data, loading, pagination } = useProducts({
    division: 'Infrastruktur',
    published: true,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    sortBy: 'name',
    order: 'asc'
  });

  return (
    <div>
      {/* Products Grid */}
      <div className="grid grid-cols-3 gap-6">
        {loading ? (
          <SkeletonLoader count={ITEMS_PER_PAGE} />
        ) : (
          data?.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
      
      {/* Pagination Controls */}
      {pagination && (
        <div className="flex items-center justify-between mt-8">
          <p className="text-gray-600">
            Page {pagination.page} of {pagination.totalPages} 
            ({pagination.total} total products)
          </p>
          
          <div className="flex gap-2">
            <button 
              disabled={!pagination.hasPrev}
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            
            <span className="px-4 py-2">
              {pagination.page}
            </span>
            
            <button 
              disabled={!pagination.hasNext}
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

### 8️⃣ Manual Refetch

**Use Case:** Refresh data tanpa auto-fetch

```javascript
import { useProducts } from '@/hooks/useProducts';

export default function ProductsWithRefresh() {
  const { data, loading, refetch } = useProducts({
    division: 'Infrastruktur',
    enabled: false  // ⚠️ Tidak auto-fetch saat component mount
  });

  return (
    <div>
      <button 
        onClick={refetch}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {loading ? 'Loading...' : 'Load Products'}
      </button>
      
      {data && (
        <div className="grid grid-cols-3 gap-4">
          {data.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
```

---

### 9️⃣ Categorized Products (dengan Variants)

**Use Case:** Products yang memiliki variasi (warna, ukuran, dll)

```javascript
import { useCategorizedProducts, useCategorizedProduct } from '@/hooks/useProducts';

// List of categorized products
export default function CategorizedProductsPage() {
  const { data, loading } = useCategorizedProducts({
    category: 'Laptop',
    published: true
  });

  return (
    <div>
      {data?.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Available in {product.variants?.length} variants</p>
        </div>
      ))}
    </div>
  );
}

// Single categorized product with full details
export default function ProductDetailPage({ params }) {
  const { data: product, loading } = useCategorizedProduct(params.slug);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product?.name}</h1>
      
      {/* Variants */}
      <div className="mt-4">
        <h3>Available Variants:</h3>
        {product?.variants?.map(variant => (
          <div key={variant.id} className="border p-4">
            <p>{variant.name}</p>
            <p>Price: Rp {variant.price?.toLocaleString()}</p>
            <p>Stock: {variant.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Contoh Lengkap

### Complete Example: Product Division Page

File: `app/products/[division]/page.jsx`

```javascript
'use client'
import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { usePathname } from 'next/navigation';

export default function ProductByDivisionPage() {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('asc');
  
  // Extract division dari URL
  const pathSegments = pathname.split('/').filter(x => x);
  const division = pathSegments[1]?.replace(/-/g, ' ');
  
  // Fetch products
  const { data, loading, error, pagination, refetch } = useProducts({
    division: division,
    published: true,
    sortBy: sortBy,
    order: order,
    page: currentPage,
    limit: 12
  });

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold capitalize mb-2">
          {division}
        </h1>
        <p className="text-gray-600">
          {pagination?.total || 0} products available
        </p>
      </div>

      {/* Sorting Controls */}
      <div className="flex gap-4 mb-6">
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
        </select>
        
        <select 
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="border rounded px-4 py-2"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <button 
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Refresh
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <p className="text-red-600">Error: {error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && data?.length === 0 && (
        <div className="bg-gray-50 border rounded-lg p-12 text-center">
          <p className="text-gray-600 text-lg">
            No products found in {division} division
          </p>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse">
              <div className="bg-gray-200 h-48 rounded mb-4"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-2/3"></div>
            </div>
          ))
        ) : (
          data?.map(product => (
            <div 
              key={product.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img 
                src={product.image || '/placeholder.jpg'} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {product.category}
                </p>
                <p className="text-lg font-bold text-blue-600">
                  Rp {product.price?.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Page {pagination.page} of {pagination.totalPages}
          </p>
          
          <div className="flex gap-2">
            <button 
              disabled={!pagination.hasPrev || loading}
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex items-center px-4">
              {pagination.page}
            </div>
            
            <button 
              disabled={!pagination.hasNext || loading}
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
```

---

## API Response Format

### Success Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Laptop ASUS VivoBook",
      "slug": "laptop-asus-vivobook",
      "description": "Laptop untuk kebutuhan sehari-hari",
      "price": 8500000,
      "category": "Laptop",
      "division": "Infrastruktur",
      "published": true,
      "priority": false,
      "image": "/images/laptop-asus.jpg",
      "created_at": "2025-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Division not found",
  "data": null
}
```

---

## Troubleshooting

### ❌ Problem: API return empty array

**Penyebab:**
- Filter terlalu spesifik
- Typo pada parameter `division` atau `category`
- Data belum di-publish (`published: false`)

**Solusi:**
```javascript
// ✅ Cek dengan debug mode
const { data, error } = useProducts({
  division: 'Infrastruktur',
  debug: true  // Akan log detail di console
});

// ✅ Coba tanpa filter dulu
const { data } = useProducts(); // Fetch semua
```

---

### ❌ Problem: Infinite re-render loop

**Penyebab:**
- Dependencies dalam `useEffect` yang berubah terus

**Solusi:**
```javascript
// ❌ Jangan seperti ini
const filters = { division: 'Infrastruktur' };
useProducts(filters); // Object baru setiap render

// ✅ Gunakan useState atau useMemo
const [filters] = useState({ division: 'Infrastruktur' });
useProducts(filters);
```

---

### ❌ Problem: Data tidak update setelah perubahan

**Solusi:**
```javascript
const { data, refetch } = useProducts({ division: 'Infrastruktur' });

// Panggil refetch setelah action
const handleDelete = async (id) => {
  await deleteProduct(id);
  refetch(); // ✅ Refresh data
};
```

---

### ❌ Problem: Search terlalu banyak request

**Penyebab:**
- Tidak ada debounce

**Solusi:**
```javascript
// ✅ Gunakan useProductSearch dengan debounce
const { data, setQuery } = useProductSearch('', {
  debounceMs: 500,  // Tunggu 500ms setelah user stop typing
  minLength: 3      // Min 3 karakter
});
```

---

## Quick Reference Table

| Kebutuhan | Hook | Parameter |
|-----------|------|-----------|
| Semua products | `useProducts()` | - |
| Filter by division | `useProducts()` | `division: 'Infrastruktur'` |
| Filter by category | `useProducts()` | `category: 'Laptop'` |
| Published only | `useProducts()` | `published: true` |
| Priority products | `useProducts()` | `priority: true` |
| Search | `useProductSearch()` | `query` state |
| Single product | `useProduct(id)` | ID atau slug |
| Price range | `useProducts()` | `minPrice`, `maxPrice` |
| Sorting | `useProducts()` | `sortBy`, `order` |
| Pagination | `useProducts()` | `page`, `limit` |
| Manual fetch | `useProducts()` | `enabled: false` + `refetch()` |

---

## Best Practices

### ✅ DO

- Gunakan `division` (singular) bukan `divisions`
- Tambahkan error handling dan loading state
- Gunakan pagination untuk data besar
- Gunakan debounce untuk search
- Gunakan `useMemo` untuk filter objects yang complex

### ❌ DON'T

- Jangan fetch tanpa loading indicator
- Jangan lupa handle empty state
- Jangan hardcode API URL (gunakan env variable)
- Jangan fetch terlalu banyak data sekaligus tanpa pagination

---

## Environment Variables

Tambahkan di `.env.local`:

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## Support & Contact

Jika ada pertanyaan atau issue:
1. Cek dokumentasi ini dulu
2. Cek console untuk error message
3. Gunakan `debug: true` untuk troubleshooting
4. Contact: [your-email@example.com]

---

**Last Updated:** October 2025  
**Version:** 1.0.0
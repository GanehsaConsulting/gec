# Products API Documentation

Complete REST API for managing product data from Google Sheets with advanced filtering, search, sorting, and pagination capabilities.

## 📋 Table of Contents

- [Overview](#overview)
- [Base URLs](#base-urls)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Query Parameters](#query-parameters)
- [Response Format](#response-format)
- [Examples](#examples)
- [Error Handling](#error-handling)

---

## 🌐 Overview

This API provides two main endpoints:
- **`/api/products`** - Master data only (lightweight, fast)
- **`/api/products/detail`** - Full product data with spec, tables, content, and images

---

## 🔗 Base URLs

**Development:**
```
http://localhost:3000
```

**Production:**
```
https://your-domain.com
```

---

## 🔐 Authentication

Currently, this API is **public** and does not require authentication.

---

## 📡 Endpoints

### 1. Get Products (Master Data)

Retrieve product master data with filtering, search, sorting, and pagination.

```
GET /api/products
```

**Features:**
- ✅ Lightweight response (master data only)
- ✅ Fast performance (1 Google Sheets call)
- ✅ Perfect for product listing pages

**Response includes:**
- id, division, productName, slug
- productCategory, descriptions, keywords
- isPublished, isPriority, price
- imageUrl, detailType

---

### 2. Get Product Details

Retrieve complete product data including spec, tables, content, and images.

```
GET /api/products/detail
```

**Features:**
- ✅ Complete product information
- ✅ Includes spec, tables, content, images
- ✅ Perfect for product detail pages

**Response includes:**
- All master data fields
- `spec` object (specification, function, strength, capacity, power)
- `tables` array (multiple tables per product)
- `content` object (tagline, highlights, selling points, notes)
- `images` array (multiple images sorted by order and priority)

---

## 🔍 Query Parameters

### Single Product

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `id` | string | Get product by ID | `?id=P001` |
| `slug` | string | Get product by slug | `?slug=generator-xyz-5000` |

### Filtering

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `published` | boolean | Filter published products | `?published=true` |
| `priority` | boolean | Filter priority products | `?priority=true` |
| `category` | string | Filter by category | `?category=Power Generation` |
| `division` | string | Filter by division | `?division=Industrial` |
| `minPrice` | number | Minimum price filter | `?minPrice=1000000` |
| `maxPrice` | number | Maximum price filter | `?maxPrice=5000000` |

### Search

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `search` or `q` | string | Search in name, description, keywords, category, division | `?search=generator` |

### Sorting

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `sortBy` | string | Sort by: `name`, `price`, `category`, `division` | `?sortBy=price` |
| `order` | string | Sort order: `asc` or `desc` | `?order=desc` |

**Note:** When sorting by `name`, priority products always appear first.

### Pagination

| Parameter | Type | Description | Default | Example |
|-----------|------|-------------|---------|---------|
| `page` | number | Page number | 1 | `?page=2` |
| `limit` | number | Items per page | 10 | `?limit=20` |

---

## 📦 Response Format

### Success Response (List)

```json
{
  "success": true,
  "data": [
    {
      "id": "P001",
      "division": "Industrial",
      "productName": "Generator XYZ 5000",
      "slug": "generator-xyz-5000",
      "productCategory": "Power Generation",
      "descriptions": "High-performance industrial generator",
      "keywords": ["generator", "power", "industrial"],
      "isPublished": true,
      "isPriority": false,
      "price": 15000000,
      "imageUrl": "https://example.com/image.jpg",
      "detailType": "standard"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Success Response (Single Product)

```json
{
  "success": true,
  "data": {
    "id": "P001",
    "productName": "Generator XYZ 5000",
    "slug": "generator-xyz-5000",
    // ... master data fields
  }
}
```

### Success Response (Product Detail)

```json
{
  "success": true,
  "data": {
    "id": "P001",
    "productName": "Generator XYZ 5000",
    // ... master data fields
    "spec": {
      "id": "P001",
      "specification": "...",
      "function": "...",
      "strength": "...",
      "capacity": "...",
      "power": "..."
    },
    "tables": [
      {
        "id": "P001",
        "tableName": "Technical Specifications",
        "tableHead": ["Feature", "Value"],
        "rows": [
          ["Voltage", "220V"],
          ["Frequency", "50Hz"]
        ]
      }
    ],
    "content": {
      "id": "P001",
      "tagline": "Power Your Business",
      "highlights": ["Reliable", "Efficient", "Durable"],
      "sellingPoints": ["Low maintenance", "High output"],
      "notes": "Contact us for bulk orders"
    },
    "images": [
      {
        "id": "IMG001",
        "productId": "P001",
        "caption": "Front View",
        "desc": "Main product image",
        "imageUrl": "https://example.com/img1.jpg",
        "order": 1,
        "isPrimary": true
      }
    ]
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "details": "Detailed error information"
}
```

---

## 💡 Examples

### Basic Queries

**Get all products (with pagination):**
```bash
GET /api/products
```

**Get published products only:**
```bash
GET /api/products?published=true
```

**Get single product by ID:**
```bash
GET /api/products?id=P001
```

**Get single product by slug (SEO-friendly):**
```bash
GET /api/products?slug=generator-xyz-5000
```

**Get full product details:**
```bash
GET /api/products/detail?slug=generator-xyz-5000
```

---

### Advanced Filtering

**Filter by category:**
```bash
GET /api/products?category=Power Generation
```

**Filter by division:**
```bash
GET /api/products?division=Industrial
```

**Priority products only:**
```bash
GET /api/products?priority=true
```

**Price range filter:**
```bash
GET /api/products?minPrice=5000000&maxPrice=15000000
```

**Combine multiple filters:**
```bash
GET /api/products?published=true&division=Industrial&priority=true
```

---

### Search

**Search for products:**
```bash
GET /api/products?search=generator
# or
GET /api/products?q=diesel engine
```

Search will look in:
- Product name
- Description
- Category
- Division
- Keywords

---

### Sorting

**Sort by name (ascending):**
```bash
GET /api/products?sortBy=name&order=asc
```

**Sort by price (descending):**
```bash
GET /api/products?sortBy=price&order=desc
```

**Sort by category:**
```bash
GET /api/products?sortBy=category&order=asc
```

---

### Pagination

**Get page 1 with 10 items:**
```bash
GET /api/products?page=1&limit=10
```

**Get page 2 with 20 items:**
```bash
GET /api/products?page=2&limit=20
```

---

### Complex Queries

**Search + Filter + Sort + Paginate:**
```bash
GET /api/products?search=generator&published=true&sortBy=price&order=asc&page=1&limit=10
```

**Price range + Category + Published:**
```bash
GET /api/products?category=Power Generation&minPrice=5000000&maxPrice=15000000&published=true
```

**Priority products in Industrial division, sorted by name:**
```bash
GET /api/products?priority=true&division=Industrial&sortBy=name&order=asc
```

---

## 🚨 Error Handling

### HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 404 | Product not found (when querying by ID/slug) |
| 500 | Server error (Google Sheets API error, etc.) |

### Common Errors

**Product Not Found (404):**
```json
{
  "success": false,
  "error": "Product not found"
}
```

**Server Error (500):**
```json
{
  "success": false,
  "error": "error:1E08010C:DECODER routines::unsupported",
  "details": "Full error stack trace"
}
```

---

## 🛠️ Frontend Integration Examples

### React / Next.js

```javascript
// Product listing page
async function getProducts(filters = {}) {
  const params = new URLSearchParams(filters);
  const response = await fetch(`/api/products?${params}`);
  const data = await response.json();
  return data;
}

// Usage
const products = await getProducts({
  published: true,
  page: 1,
  limit: 12,
  sortBy: 'name'
});

// Product detail page
async function getProductDetail(slug) {
  const response = await fetch(`/api/products/detail?slug=${slug}`);
  const data = await response.json();
  return data;
}

// Usage
const product = await getProductDetail('generator-xyz-5000');
```

### JavaScript (Vanilla)

```javascript
// Fetch products with filters
fetch('/api/products?published=true&category=Power Generation&page=1&limit=10')
  .then(response => response.json())
  .then(data => {
    console.log('Products:', data.data);
    console.log('Pagination:', data.pagination);
  });

// Fetch product detail
fetch('/api/products/detail?slug=generator-xyz-5000')
  .then(response => response.json())
  .then(data => {
    console.log('Product:', data.data);
    console.log('Images:', data.data.images);
    console.log('Spec:', data.data.spec);
  });
```

---

## 📊 Data Structure

### Master Data Schema

```typescript
{
  id: string;
  division: string;
  productName: string;
  slug: string;              // Auto-generated from productName
  productCategory: string;
  descriptions: string;
  keywords: string[];         // Array of keywords
  isPublished: boolean;
  isPriority: boolean;
  price: number;
  imageUrl: string;
  detailType: string;
}
```

### Spec Schema

```typescript
{
  id: string;
  specification: string;
  function: string;
  strength: string;
  capacity: string;
  power: string;
}
```

### Table Schema

```typescript
{
  id: string;
  tableName: string;
  tableHead: string[];        // Array of headers
  rows: string[][];          // 2D array of table data
}
```

### Content Schema

```typescript
{
  id: string;
  tagline: string;
  highlights: string[];       // Array of highlights
  sellingPoints: string[];    // Array of selling points
  notes: string;
}
```

### Images Schema

```typescript
{
  id: string;
  productId: string;
  caption: string;
  desc: string;
  imageUrl: string;
  order: number;
  isPrimary: boolean;
}
```

---

## 🎯 Best Practices

1. **Use `/api/products` for listing pages** - It's faster and more efficient
2. **Use `/api/products/detail` for detail pages** - Get all data in one request
3. **Use slug instead of ID in URLs** - Better for SEO (`/products/generator-xyz` vs `/products/P001`)
4. **Implement pagination** - Don't fetch all products at once
5. **Cache responses** - Products don't change frequently
6. **Use search for user input** - Combine with filters for better UX
7. **Show loading states** - API calls to Google Sheets can take 1-2 seconds

---

## 🔧 Configuration

## 📞 Support

For issues or questions:
- Create an issue in the repository
- Contact the development team

---

## 📝 Changelog

### Version 1.0.0
- ✅ Master data endpoint with filtering
- ✅ Product detail endpoint
- ✅ Search functionality
- ✅ Sorting (name, price, category, division)
- ✅ Pagination
- ✅ Price range filtering
- ✅ Multiple images per product
- ✅ SEO-friendly slugs
- ✅ Priority product support
// Helper untuk konversi string ke boolean
export const parseBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const upperValue = value.toUpperCase().trim();
    return upperValue === 'TRUE' || upperValue === '1' || upperValue === 'YES' || upperValue === 'BENAR';
  }
  return false;
};

// Helper untuk parse price
export const parsePrice = (priceString) => {
  if (!priceString) return 0;
  // Remove currency symbols and commas
  const cleaned = priceString.toString().replace(/[Rp.,\s]/g, '');
  const number = parseFloat(cleaned);
  return isNaN(number) ? 0 : number;
};

// Helper untuk parse array dari string (comma separated)
export const parseArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value.split(',').map(item => item.trim()).filter(item => item);
};

// Helper untuk trim string
export const trimString = (value) => {
  return (value || '').toString().trim();
};

// Helper untuk generate slug dari productName
export const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
};

// Helper untuk parse number/order
export const parseNumber = (value) => {
  if (!value) return 0;
  const number = parseInt(value);
  return isNaN(number) ? 0 : number;
};

// Format Master Data
export const formatMasterData = (rawData) => {
  return rawData.map(item => ({
    id: trimString(item.id),
    division: trimString(item.division),
    productName: trimString(item.productName),
    slug: generateSlug(item.productName), // Auto-generate slug
    partOf: trimString(item.partOf), // NEW: Parent product ID
    productCategory: trimString(item.productCategory),
    descriptions: trimString(item.descriptions),
    keywords: parseArray(item.keywords), // Convert to array
    isPublished: parseBoolean(item.isPublished),
    isPriority: parseBoolean(item.isPriority),
    price: parsePrice(item.price),
    imageUrl: trimString(item.imageUrl),
    detailType: trimString(item.detailType),
  }));
};

// Format Spec Data
export const formatSpecData = (rawData) => {
  return rawData.map(item => ({
    id: trimString(item.id),
    specification: trimString(item.specification),
    function: trimString(item.function),
    strength: trimString(item.strength),
    capacity: trimString(item.capacity),
    power: trimString(item.power),
  }));
};

// Format Table Data
export function formatTableData(rows) {
  if (!rows || rows.length === 0) return [];

  const grouped = {};

  rows.forEach(row => {
    const key = `${row.id}_${row.tableName}`;

    if (!grouped[key]) {
      grouped[key] = {
        id: row.id,
        tableName: row.tableName,
        tableHead:
          row.tableHead && row.tableHead !== "–"
            ? row.tableHead.split(";").map(h => h.trim())
            : [],
        rows: [],
      };
    }

    grouped[key].rows.push([
      row.col1 || "",
      row.col2 || "",
      row.col3 || "",
      row.col4 || "",
    ]);
  });

  // fallback ambil tableHead kalau ada di salah satu row
  Object.values(grouped).forEach(group => {
    if (group.tableHead.length === 0) {
      const headRow = rows.find(
        r => r.id === group.id && r.tableName === group.tableName && r.tableHead !== "–"
      );
      if (headRow) {
        group.tableHead = headRow.tableHead.split(";").map(h => h.trim());
      }
    }
  });

  return Object.values(grouped);
}

// Format Content Data
export const formatContentData = (rawData) => {
  return rawData.map(item => ({
    id: trimString(item.id),
    tagline: trimString(item.tagline),
    highlights: parseArray(item.highlights), // Convert to array
    sellingPoints: parseArray(item.sellingPoints), // Convert to array
    notes: trimString(item.notes),
  }));
};

// Format Images Data
export const formatImagesData = (rawData) => {
  return rawData.map(item => ({
    id: trimString(item.id),
    productId: trimString(item.productId),
    caption: trimString(item.caption),
    desc: trimString(item.desc),
    imageUrl: trimString(item.imageUrl),
    order: parseNumber(item.order),
    isPrimary: parseBoolean(item.isPrimary),
  }));
};

// Helper untuk group data by ID (combine all sheets)
export const groupProductData = (masterData, spec, table, content, images) => {
  const productMap = new Map();

  // Add master data as base
  masterData.forEach(product => {
    productMap.set(product.id, { ...product });
  });

  // Add spec data
  spec.forEach(item => {
    if (productMap.has(item.id)) {
      productMap.get(item.id).spec = item;
    }
  });

  // Add table data (could be multiple tables per product)
  table.forEach(item => {
    if (productMap.has(item.id)) {
      if (!productMap.get(item.id).tables) {
        productMap.get(item.id).tables = [];
      }
      productMap.get(item.id).tables.push(item);
    }
  });

  // Add content data
  content.forEach(item => {
    if (productMap.has(item.id)) {
      productMap.get(item.id).content = item;
    }
  });

  // Add images data (could be multiple images per product)
  images.forEach(item => {
    if (productMap.has(item.productId)) {
      if (!productMap.get(item.productId).images) {
        productMap.get(item.productId).images = [];
      }
      productMap.get(item.productId).images.push(item);
    }
  });

  // Sort images by order and put primary first
  productMap.forEach(product => {
    if (product.images) {
      product.images.sort((a, b) => {
        // Primary images first
        if (a.isPrimary && !b.isPrimary) return -1;
        if (!a.isPrimary && b.isPrimary) return 1;
        // Then sort by order
        return a.order - b.order;
      });
    }
  });

  return Array.from(productMap.values());
};

// Filter hanya produk yang published
export const getPublishedProducts = (products) => {
  return products.filter(product => product.isPublished);
};

// Filter produk priority
export const getPriorityProducts = (products) => {
  return products.filter(product => product.isPriority);
};

// Get product by ID
export const getProductById = (products, id) => {
  return products.find(product => product.id === id);
};

// Get product by slug
export const getProductBySlug = (products, slug) => {
  return products.find(product => product.slug === slug);
};

// Get product by ID or slug
export const getProduct = (products, identifier) => {
  // Try by ID first
  let product = products.find(p => p.id === identifier);

  // If not found, try by slug
  if (!product) {
    product = products.find(p => p.slug === identifier);
  }

  return product;
};

// Get products by category
export const getProductsByCategory = (products, category) => {
  return products.filter(product =>
    product.productCategory.toLowerCase() === category.toLowerCase()
  );
};

// Get products by division
export const getProductsByDivision = (products, division) => {
  return products.filter(product =>
    product.division.toLowerCase() === division.toLowerCase()
  );
};

// Search products by keyword (search in name, description, keywords)
export const searchProducts = (products, query, debug = false) => {
  if (!query) return products;

  // Sanitize query: remove quotes, trim, lowercase
  const lowerQuery = query
    .replace(/['"]/g, '') // Remove single and double quotes
    .trim()
    .toLowerCase();

  if (!lowerQuery) return products;

  // Filter dan scoring
  const scoredProducts = products
    .map(product => {
      let score = 0;
      const scoreDetails = []; // For debugging
      const lowerName = product.productName.toLowerCase();
      const lowerSlug = product.slug.toLowerCase();
      const lowerDesc = product.descriptions.toLowerCase();
      const lowerCategory = product.productCategory.toLowerCase();
      const lowerDivision = product.division.toLowerCase();
      const lowerKeywords = product.keywords.join(' ').toLowerCase();

      // ProductName scoring (exclusive - only highest match)
      if (lowerName === lowerQuery) {
        score += 100;
        if (debug) scoreDetails.push('name exact: +100');
      } else if (lowerName.startsWith(lowerQuery)) {
        score += 50;
        if (debug) scoreDetails.push('name starts: +50');
      } else {
        const nameWords = lowerName.split(/\s+/);
        if (nameWords.some(word => word === lowerQuery)) {
          score += 40;
          if (debug) scoreDetails.push('name word exact: +40');
        } else if (nameWords.some(word => word.startsWith(lowerQuery))) {
          score += 35;
          if (debug) scoreDetails.push('name word starts: +35');
        } else if (lowerName.includes(lowerQuery)) {
          score += 30;
          if (debug) scoreDetails.push('name contains: +30');
        }
      }

      // Slug scoring (exclusive - only highest match)
      if (lowerSlug === lowerQuery) {
        score += 90;
        if (debug) scoreDetails.push('slug exact: +90');
      } else if (lowerSlug.startsWith(lowerQuery)) {
        score += 45;
        if (debug) scoreDetails.push('slug starts: +45');
      } else if (lowerSlug.includes(lowerQuery)) {
        score += 25;
        if (debug) scoreDetails.push('slug contains: +25');
      }

      // Category scoring (exclusive)
      if (lowerCategory === lowerQuery) {
        score += 25;
        if (debug) scoreDetails.push('category exact: +25');
      } else if (lowerCategory.includes(lowerQuery)) {
        score += 15;
        if (debug) scoreDetails.push('category contains: +15');
      }

      // Keywords scoring (exclusive)
      const keywordWords = lowerKeywords.split(/[\s;,]+/);
      if (keywordWords.some(word => word === lowerQuery)) {
        score += 20;
        if (debug) scoreDetails.push('keyword exact: +20');
      } else if (keywordWords.some(word => word.startsWith(lowerQuery))) {
        score += 15;
        if (debug) scoreDetails.push('keyword starts: +15');
      } else if (lowerKeywords.includes(lowerQuery)) {
        score += 10;
        if (debug) scoreDetails.push('keyword contains: +10');
      }

      // Description contains query
      if (lowerDesc.includes(lowerQuery)) {
        score += 5;
        if (debug) scoreDetails.push('desc contains: +5');
      }

      // Division contains query
      if (lowerDivision.includes(lowerQuery)) {
        score += 3;
        if (debug) scoreDetails.push('division contains: +3');
      }

      return {
        ...product,
        _searchScore: score,
        _scoreDetails: debug ? scoreDetails : undefined
      };
    })
    .filter(product => product._searchScore > 0) // Only products that match
    .sort((a, b) => {
      // Sort by score descending
      if (b._searchScore !== a._searchScore) {
        return b._searchScore - a._searchScore;
      }
      // If same score, priority products first
      if (a.isPriority && !b.isPriority) return -1;
      if (!a.isPriority && b.isPriority) return 1;
      // Then sort by name
      return a.productName.localeCompare(b.productName);
    });

  // Remove search score from final results (keep details if debug)
  return scoredProducts.map(({ _searchScore, _scoreDetails, ...product }) => {
    if (debug) {
      return {
        ...product,
        _debug: {
          score: _searchScore,
          details: _scoreDetails
        }
      };
    }
    return product;
  });
};

// Sort products
export const sortProducts = (products, sortBy, order = 'asc') => {
  const sorted = [...products];

  sorted.sort((a, b) => {
    let valueA, valueB;

    switch (sortBy) {
      case 'name':
        valueA = a.productName.toLowerCase();
        valueB = b.productName.toLowerCase();
        break;
      case 'price':
        valueA = a.price;
        valueB = b.price;
        break;
      case 'category':
        valueA = a.productCategory.toLowerCase();
        valueB = b.productCategory.toLowerCase();
        break;
      case 'division':
        valueA = a.division.toLowerCase();
        valueB = b.division.toLowerCase();
        break;
      case 'id':
        valueA = a.id;
        valueB = b.id;
        break;
      default:
        // Default: sort by ID (order in sheet)
        valueA = a.id;
        valueB = b.id;
    }

    if (valueA < valueB) return order === 'asc' ? -1 : 1;
    if (valueA > valueB) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
};

// Paginate products
export const paginateProducts = (products, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    data: products.slice(startIndex, endIndex),
    pagination: {
      total: products.length,
      page: page,
      limit: limit,
      totalPages: Math.ceil(products.length / limit),
      hasNext: endIndex < products.length,
      hasPrev: page > 1,
    }
  };
};

// Filter by price range
export const filterByPriceRange = (products, minPrice, maxPrice) => {
  return products.filter(product => {
    if (minPrice && product.price < minPrice) return false;
    if (maxPrice && product.price > maxPrice) return false;
    return true;
  });
};

// Get primary image for a product
export const getPrimaryImage = (product) => {
  if (!product.images || product.images.length === 0) {
    return product.imageUrl || null; // Fallback to master data imageUrl
  }
  const primaryImage = product.images.find(img => img.isPrimary);
  return primaryImage ? primaryImage.imageUrl : product.images[0].imageUrl;
};

// Get all images sorted for a product
export const getProductImages = (product) => {
  if (!product.images || product.images.length === 0) {
    // If no images array, return master data imageUrl as single image
    if (product.imageUrl) {
      return [{
        imageUrl: product.imageUrl,
        caption: product.productName,
        desc: '',
        order: 0,
        isPrimary: true,
      }];
    }
    return [];
  }
  return product.images;
};

// Group products with their variants
export const groupProductsWithVariants = (products) => {
  // Collect all partOf IDs that exist
  const partOfIds = new Set(
    products
      .filter(p => p.partOf && p.partOf.trim() !== '' && p.partOf !== '-')
      .map(p => p.partOf)
  );

  // Parent products = products whose ID is referenced in partOf OR products without partOf
  const parentProducts = products.filter(p => {
    const hasNoPartOf = !p.partOf || p.partOf.trim() === '' || p.partOf === '-';
    const isReferencedAsParent = partOfIds.has(p.id);
    return hasNoPartOf || isReferencedAsParent;
  });

  // Variants = products that have partOf value
  const childVariants = products.filter(p => p.partOf && p.partOf.trim() !== '' && p.partOf !== '-');

  // Attach variants to parent products
  return parentProducts.map(parent => {
    const productVariants = childVariants.filter(v => v.partOf === parent.id);

    if (productVariants.length > 0) {
      // Filter variants yang isPublished === true
      const publishedChildren = productVariants.filter(v => v.isPublished === true);

      // Jika parent unpublished tapi ada children yang published
      if (parent.isPublished === false && publishedChildren.length > 0) {
        // Promosikan child pertama sebagai parent baru
        const newParent = publishedChildren[0];
        const remainingChildren = publishedChildren.slice(1);

        return {
          id: newParent.id,
          division: newParent.division,
          productCategory: parent.productCategory, // Tetap gunakan category dari parent asli
          isPublished: newParent.isPublished,
          isPriority: newParent.isPriority,
          imageUrl: newParent.imageUrl,
          hasVariants: true,
          variants: [newParent, ...remainingChildren]
        };
      }

      // Jika parent published
      if (parent.isPublished === true) {
        const allPublishedVariants = [parent, ...publishedChildren];

        return {
          id: parent.id,
          division: parent.division,
          productCategory: parent.productCategory,
          isPublished: parent.isPublished,
          isPriority: parent.isPriority,
          imageUrl: parent.imageUrl,
          hasVariants: true,
          variants: allPublishedVariants
        };
      }

      // Jika parent unpublished dan tidak ada children yang published
      return null;
    }

    // Produk tanpa variant - hanya tampilkan jika published
    if (parent.isPublished === false) {
      return null;
    }

    return {
      ...parent,
      hasVariants: false,
      variants: [],
      variantCount: 0
    };
  }).filter(p => p !== null);
};

// Flatten variants (show all as separate products)
export const flattenVariants = (products) => {
  return products; // Return as is, variants shown separately
};

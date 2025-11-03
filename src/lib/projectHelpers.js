// Helper untuk konversi string ke boolean
export const parseBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const upperValue = value.toUpperCase().trim();
    return upperValue === 'TRUE' || upperValue === '1' || upperValue === 'YES' || upperValue === 'BENAR';
  }
  return false;
};

// Helper untuk trim string
export const trimString = (value) => {
  return (value || '').toString().trim();
};

// Helper untuk generate slug dari title
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

// Helper untuk parse array dari string (semicolon separated untuk imageUrl)
export const parseImageArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  // Split by semicolon dan trim setiap URL
  return value
    .split(';')
    .map(item => item.trim())
    .filter(item => item && item !== '');
};

// Helper untuk parse date DD/MM/YYYY
export const parseDate = (dateStr) => {
  if (!dateStr) return null;
  const [day, month, year] = dateStr.split("/");
  return new Date(`${year}-${month}-${day}`);
};

// Format Project Data
export const formatProjectData = (rawData) => {
  // Jika data sudah berupa array of objects
  if (Array.isArray(rawData) && rawData.length > 0 && typeof rawData[0] === 'object' && !Array.isArray(rawData[0])) {
    return rawData.map(item => ({
      id: trimString(item.id),
      category: trimString(item.category),
      title: trimString(item.title),
      slug: generateSlug(item.title), // Auto-generate slug
      thumbnail: trimString(item.thumbnail),
      date: trimString(item.date),
      dateObject: parseDate(item.date), // Untuk sorting
      location: trimString(item.location),
      content: trimString(item.content),
      imageUrl: parseImageArray(item.imageUrl), // Convert to array
      isPublished: parseBoolean(item.isPublished),
      isPriority: parseBoolean(item.isPriority),
    }));
  }

  // Jika data masih berupa array 2D (raw dari Sheets)
  if (!Array.isArray(rawData) || rawData.length < 2) {
    console.log("Invalid rawData: not an array or insufficient rows");
    return [];
  }

  const headers = rawData[0];
  
  if (!Array.isArray(headers)) {
    console.error("Headers is not an array:", headers);
    return [];
  }

  const rows = rawData.slice(1);

  return rows.map((row) => {
    if (!Array.isArray(row)) {
      console.warn("Row is not an array:", row);
      return null;
    }

    const project = {};
    headers.forEach((header, index) => {
      project[header] = row[index] || "";
    });

    // Parse imageUrl
    project.imageUrl = parseImageArray(project.imageUrl);
    
    // Convert booleans
    project.isPublished = parseBoolean(project.isPublished);
    project.isPriority = parseBoolean(project.isPriority);
    
    // Generate slug
    project.slug = generateSlug(project.title);
    
    // Parse date for sorting
    project.dateObject = parseDate(project.date);

    return project;
  }).filter(project => project !== null);
};

// Filter hanya project yang published
export const getPublishedProjects = (projects) => {
  return projects.filter(project => project.isPublished);
};

// Filter project priority
export const getPriorityProjects = (projects) => {
  return projects.filter(project => project.isPriority);
};

// Get project by ID
export const getProjectById = (projects, id) => {
  return projects.find(project => project.id === id);
};

// Get project by slug
export const getProjectBySlug = (projects, slug) => {
  return projects.find(project => project.slug === slug);
};

// Get project by ID or slug
export const getProject = (projects, identifier) => {
  // Try by ID first
  let project = projects.find(p => p.id === identifier);

  // If not found, try by slug
  if (!project) {
    project = projects.find(p => p.slug === identifier);
  }

  return project;
};

// Get projects by category
export const getProjectsByCategory = (projects, category) => {
  return projects.filter(project =>
    project.category.toLowerCase() === category.toLowerCase()
  );
};

// Get projects by location (partial match)
export const getProjectsByLocation = (projects, location) => {
  return projects.filter(project =>
    project.location.toLowerCase().includes(location.toLowerCase())
  );
};

// Search projects by keyword (search in title, category, location, content)
export const searchProjects = (projects, query, debug = false) => {
  if (!query) return projects;

  // Sanitize query: remove quotes, trim, lowercase
  const lowerQuery = query
    .replace(/['"]/g, '') // Remove single and double quotes
    .trim()
    .toLowerCase();

  if (!lowerQuery) return projects;

  // Filter dan scoring
  const scoredProjects = projects
    .map(project => {
      let score = 0;
      const scoreDetails = []; // For debugging
      const lowerTitle = project.title.toLowerCase();
      const lowerSlug = project.slug.toLowerCase();
      const lowerCategory = project.category.toLowerCase();
      const lowerLocation = project.location.toLowerCase();
      const lowerContent = project.content.toLowerCase();

      // Title scoring (exclusive - only highest match)
      if (lowerTitle === lowerQuery) {
        score += 100;
        if (debug) scoreDetails.push('title exact: +100');
      } else if (lowerTitle.startsWith(lowerQuery)) {
        score += 50;
        if (debug) scoreDetails.push('title starts: +50');
      } else {
        const titleWords = lowerTitle.split(/\s+/);
        if (titleWords.some(word => word === lowerQuery)) {
          score += 40;
          if (debug) scoreDetails.push('title word exact: +40');
        } else if (titleWords.some(word => word.startsWith(lowerQuery))) {
          score += 35;
          if (debug) scoreDetails.push('title word starts: +35');
        } else if (lowerTitle.includes(lowerQuery)) {
          score += 30;
          if (debug) scoreDetails.push('title contains: +30');
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

      // Location scoring (exclusive)
      if (lowerLocation === lowerQuery) {
        score += 20;
        if (debug) scoreDetails.push('location exact: +20');
      } else if (lowerLocation.includes(lowerQuery)) {
        score += 10;
        if (debug) scoreDetails.push('location contains: +10');
      }

      // Content contains query
      if (lowerContent.includes(lowerQuery)) {
        score += 5;
        if (debug) scoreDetails.push('content contains: +5');
      }

      return {
        ...project,
        _searchScore: score,
        _scoreDetails: debug ? scoreDetails : undefined
      };
    })
    .filter(project => project._searchScore > 0) // Only projects that match
    .sort((a, b) => {
      // Sort by score descending
      if (b._searchScore !== a._searchScore) {
        return b._searchScore - a._searchScore;
      }
      // If same score, priority projects first
      if (a.isPriority && !b.isPriority) return -1;
      if (!a.isPriority && b.isPriority) return 1;
      // Then sort by date (newest first)
      return (b.dateObject || 0) - (a.dateObject || 0);
    });

  // Remove search score from final results (keep details if debug)
  return scoredProjects.map(({ _searchScore, _scoreDetails, ...project }) => {
    if (debug) {
      return {
        ...project,
        _debug: {
          score: _searchScore,
          details: _scoreDetails
        }
      };
    }
    return project;
  });
};

// Sort projects
export const sortProjects = (projects, sortBy = 'date', order = 'desc') => {
  const sorted = [...projects];

  sorted.sort((a, b) => {
    let valueA, valueB;

    switch (sortBy) {
      case 'title':
        valueA = a.title.toLowerCase();
        valueB = b.title.toLowerCase();
        break;
      case 'category':
        valueA = a.category.toLowerCase();
        valueB = b.category.toLowerCase();
        break;
      case 'location':
        valueA = a.location.toLowerCase();
        valueB = b.location.toLowerCase();
        break;
      case 'date':
        valueA = a.dateObject || new Date(0);
        valueB = b.dateObject || new Date(0);
        break;
      case 'id':
        valueA = a.id;
        valueB = b.id;
        break;
      default:
        // Default: sort by date
        valueA = a.dateObject || new Date(0);
        valueB = b.dateObject || new Date(0);
    }

    if (valueA < valueB) return order === 'asc' ? -1 : 1;
    if (valueA > valueB) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
};

// Paginate projects
export const paginateProjects = (projects, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    data: projects.slice(startIndex, endIndex),
    pagination: {
      total: projects.length,
      page: page,
      limit: limit,
      totalPages: Math.ceil(projects.length / limit),
      hasNext: endIndex < projects.length,
      hasPrev: page > 1,
    }
  };
};

// Get primary/thumbnail image for a project
export const getPrimaryImage = (project) => {
  // Use thumbnail if available
  if (project.thumbnail) {
    return project.thumbnail;
  }
  // Fallback to first image in imageUrl array
  if (project.imageUrl && project.imageUrl.length > 0) {
    return project.imageUrl[0];
  }
  return null;
};

// Get all images for a project
export const getProjectImages = (project) => {
  const images = [];
  
  // Add thumbnail first if exists
  if (project.thumbnail) {
    images.push({
      url: project.thumbnail,
      type: 'thumbnail',
      caption: project.title,
    });
  }
  
  // Add all other images
  if (project.imageUrl && project.imageUrl.length > 0) {
    project.imageUrl.forEach((url, index) => {
      // Don't duplicate if thumbnail is in imageUrl array
      if (url !== project.thumbnail) {
        images.push({
          url: url,
          type: 'gallery',
          caption: `${project.title} - Image ${index + 1}`,
        });
      }
    });
  }
  
  return images;
};
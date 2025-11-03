import { getSheetData } from "@/lib/googleSheets";
import {
  formatProjectData,
  getPublishedProjects,
  getPriorityProjects,
  getProject,
  searchProjects,
  getProjectsByCategory,
  getProjectsByLocation,
  sortProjects,
  paginateProjects,
} from "@/lib/projectHelpers";

export async function GET(request) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const { searchParams } = new URL(request.url);
    
    // Query params
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const published = searchParams.get('published');
    const priority = searchParams.get('priority');
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const search = searchParams.get('search') || searchParams.get('q');
    const sortBy = searchParams.get('sortBy') || 'date';
    const order = searchParams.get('order') || 'desc';
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const debug = searchParams.get('debug') === 'true';

    // Fetch project data from Google Sheets
    const rawProjectData = await getSheetData(
      spreadsheetId, 
      process.env.GOOGLE_SHEET_RANGE_PROJECTS
    );

    let projects = formatProjectData(rawProjectData);

    // Get single project by ID or slug
    if (id || slug) {
      const identifier = id || slug;
      const project = getProject(projects, identifier);
      
      return Response.json({
        success: true,
        data: project || null,
      });
    }

    // Apply filters
    if (published === 'true') {
      projects = getPublishedProjects(projects);
    }

    if (priority === 'true') {
      projects = getPriorityProjects(projects);
    }

    if (category) {
      projects = getProjectsByCategory(projects, category);
    }

    if (location) {
      projects = getProjectsByLocation(projects, location);
    }

    // Search
    if (search) {
      projects = searchProjects(projects, search, debug);
    }

    // Sort
    projects = sortProjects(projects, sortBy, order);

    // Paginate
    const result = paginateProjects(projects, page, limit);

    return Response.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Sheets API error:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message,
        details: error.toString()
      }), 
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
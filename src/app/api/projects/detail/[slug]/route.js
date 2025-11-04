
import { getSheetData } from "@/lib/googleSheets";
import {
  formatProjectData,
  getProject,
  getProjectImages,
  getPrimaryImage,
} from "@/lib/projectHelpers";

export async function GET(request, { params }) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const { slug } = params;

    if (!slug) {
      return Response.json(
        {
          success: false,
          error: "Slug is required",
        },
        { status: 400 }
      );
    }

    // Fetch project data from Google Sheets
    const rawProjectData = await getSheetData(
      spreadsheetId,
      process.env.GOOGLE_SHEET_RANGE_PROJECTS
    );

    const projects = formatProjectData(rawProjectData);

    // Get project by slug (or ID as fallback)
    const project = getProject(projects, slug);

    if (!project) {
      return Response.json(
        {
          success: false,
          error: "Project not found",
        },
        { status: 404 }
      );
    }

    // Check if project is published (unless debug mode)
    const { searchParams } = new URL(request.url);
    const debug = searchParams.get("debug") === "true";

    if (!project.isPublished && !debug) {
      return Response.json(
        {
          success: false,
          error: "Project not found",
        },
        { status: 404 }
      );
    }

    // Enhance project with additional data
    const enhancedProject = {
      ...project,
      primaryImage: getPrimaryImage(project),
      images: getProjectImages(project),
      totalImages: project.imageUrl?.length || 0,
    };

    // Get related projects (same category, excluding current)
    const relatedProjects = projects
      .filter(
        (p) =>
          p.id !== project.id &&
          p.category === project.category &&
          p.isPublished === true
      )
      .slice(0, 4)
      .map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        category: p.category,
        location: p.location,
        date: p.date,
        thumbnail: p.thumbnail,
        isPriority: p.isPriority,
      }));

    return Response.json({
      success: true,
      data: enhancedProject,
      related: relatedProjects,
    });
  } catch (error) {
    console.error("Sheets API error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        details: error.toString(),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
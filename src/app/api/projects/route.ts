import { NextRequest, NextResponse } from "next/server";
import { FEATURED_PROJECTS } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Paramètres de filtrage
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");
    const technologies = searchParams.get("technologies")?.split(",");

    // Paramètres de pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Paramètres de tri
    const sortBy = searchParams.get("sortBy") || "timeline"; // timeline, title
    const order = searchParams.get("order") || "desc"; // asc, desc

    // Filtrage
    let filteredProjects = [...FEATURED_PROJECTS];

    // Filtre par catégorie
    if (category && category !== "all") {
      filteredProjects = filteredProjects.filter(
        (project) => project.category === category
      );
    }

    // Filtre par recherche textuelle
    if (search) {
      const query = search.toLowerCase().trim();
      filteredProjects = filteredProjects.filter((project) => {
        const searchableText = [
          project.title,
          project.headline,
          project.description,
          project.summary,
          project.problem,
          project.solution,
          project.status,
          ...project.technologies,
          ...project.features,
          ...project.impact,
          ...project.role,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      });
    }

    // Filtre par statut
    if (status) {
      filteredProjects = filteredProjects.filter(
        (project) => project.status.toLowerCase() === status.toLowerCase()
      );
    }

    // Filtre par featured
    if (featured !== null && featured !== undefined) {
      const isFeatured = featured === "true";
      filteredProjects = filteredProjects.filter(
        (project) => project.featured === isFeatured
      );
    }

    // Filtre par technologies
    if (technologies && technologies.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        technologies.some((tech) =>
          project.technologies.some((projectTech) =>
            projectTech.toLowerCase().includes(tech.toLowerCase().trim())
          )
        )
      );
    }

    // Tri
    filteredProjects.sort((a, b) => {
      let comparison = 0;

      if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === "timeline") {
        // Extraction de l'année pour le tri
        const yearA = parseInt(a.timeline.match(/\d{4}/)?.[0] || "0");
        const yearB = parseInt(b.timeline.match(/\d{4}/)?.[0] || "0");
        comparison = yearA - yearB;
      }

      return order === "asc" ? comparison : -comparison;
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

    // Métadonnées de pagination
    const totalProjects = filteredProjects.length;
    const totalPages = Math.ceil(totalProjects / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Statistiques
    const stats = {
      total: totalProjects,
      categories: [...new Set(FEATURED_PROJECTS.map((p) => p.category))],
      technologies: [
        ...new Set(FEATURED_PROJECTS.flatMap((p) => p.technologies)),
      ].sort(),
    };

    return NextResponse.json({
      success: true,
      data: paginatedProjects,
      pagination: {
        page,
        limit,
        totalProjects,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
      stats,
      filters: {
        category,
        search,
        status,
        featured,
        technologies,
        sortBy,
        order,
      },
    });
  } catch (error) {
    console.error("Error in /api/projects:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Une erreur est survenue lors de la récupération des projets",
      },
      { status: 500 }
    );
  }
}

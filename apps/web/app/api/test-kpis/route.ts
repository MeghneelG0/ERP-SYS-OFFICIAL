import { NextResponse } from "next/server";
import { prisma } from "@repo/db";

export async function GET(): Promise<NextResponse> {
  try {
    // Fetch all KPIs with just their IDs and names
    const kpis = await prisma.kpiTemplate.findMany({
      select: {
        id: true,
        kpi_name: true,
        kpi_description: true,
      },
      orderBy: {
        id: 'asc'
      }
    });

    return NextResponse.json({
      message: "Available KPIs for testing",
      kpis: kpis,
      total: kpis.length
    });
  } catch (error) {
    console.error("Error fetching KPIs:", error);
    return NextResponse.json(
      { error: "Failed to fetch KPIs" },
      { status: 500 }
    );
  }
}
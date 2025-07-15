// ROUTE DISABLED: This API route is commented out due to backend revamp. Restore or update after backend changes.
/*
import { NextResponse } from "next/server";
import { prisma } from "@repo/db";

/**
 * GET function to fetch all department_pillar or department_pillar for a specific department.
 *\/
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dept_id = searchParams.get("dept_id");

    let department_pillar;
    if (dept_id) {
      // Get department_pillar for a specific department
      department_pillar = await prisma.departmentPillar.findMany({
        where: { dept_id: Number(dept_id) },
        include: {
          department: {
            select: {
              dept_id: true,
              dept_name: true,
            },
          },
          assigned_kpi: {
            select: {
              assigned_kpi_id: true,
              kpi_name: true,
              kpi_status: true,
            },
          },
        },
      });
    } else {
      // Get all department_pillar
      department_pillar = await prisma.departmentPillar.findMany({
        include: {
          department: {
            select: {
              dept_id: true,
              dept_name: true,
            },
          },
          _count: {
            select: { assigned_kpi: true },
          },
        },
      });
    }

    return NextResponse.json({ success: true, department_pillar });
  } catch (error) {
    console.error("Error fetching department_pillar:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch department_pillar" },
      { status: 500 },
    );
  }
}

/**
 * POST function to create a new pillar.
 *\/
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pillar_name, dept_id } = body;

    // Validate required fields
    if (!pillar_name) {
      return NextResponse.json(
        { success: false, error: "Pillar name is required" },
        { status: 400 },
      );
    }

    if (!dept_id) {
      return NextResponse.json(
        { success: false, error: "Department ID is required" },
        { status: 400 },
      );
    }

    // Check if department exists
    const department = await prisma.department.findUnique({
      where: { dept_id: Number(dept_id) },
    });

    if (!department) {
      return NextResponse.json(
        { success: false, error: "Department not found" },
        { status: 404 },
      );
    }

    // Check if pillar with same name already exists in that department
    const existingPillar = await prisma.departmentPillar.findFirst({
      where: {
        pillar_name,
        dept_id: Number(dept_id),
      },
    });

    if (existingPillar) {
      return NextResponse.json(
        {
          success: false,
          error: "A pillar with this name already exists in this department",
        },
        { status: 400 },
      );
    }

    // Create new pillar
    const newPillar = await prisma.departmentPillar.create({
      data: {
        pillar_name,
        dept_id: Number(dept_id),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Pillar created successfully",
      pillar: newPillar,
    });
  } catch (error) {
    console.error("Error creating pillar:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create pillar" },
      { status: 500 },
    );
  }
}
*/

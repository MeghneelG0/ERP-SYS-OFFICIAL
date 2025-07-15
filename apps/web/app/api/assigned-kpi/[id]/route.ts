import { NextResponse } from "next/server";
import { prisma } from "@repo/db";

/**
 * GET function to fetch a specific assigned KPI, including department context.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    const { id } = params;
    const kpiId = String(id);

    const assignedKpi = await prisma.departmentKpi.findUnique({
      where: { id: kpiId },
      include: {
        department_pillar: true,
        department: true,
      },
    });

    if (!assignedKpi) {
      return NextResponse.json(
        { success: false, error: "Assigned KPI not found" },
        { status: 404 },
      );
    }

    // Return with transformed structure and department context
    const responseKpi = {
      id: assignedKpi.id,
      dept_pillar_id: assignedKpi.dept_pillar_id,
      dept_id: assignedKpi.dept_id,
      kpi_name: assignedKpi.kpi_name,
      kpi_status: assignedKpi.kpi_status,
      assigned_date: assignedKpi.assigned_date,
      completed_date: assignedKpi.completed_date,
      comments: assignedKpi.comments,
      current_value: assignedKpi.current_value,
      kpi_description: assignedKpi.kpi_description,
      form_responses: assignedKpi.form_responses,
      department_pillar: assignedKpi.department_pillar,
      department: assignedKpi.department,
      elements: assignedKpi.form_data,
    };

    return NextResponse.json({ success: true, assignedKpi: responseKpi });
  } catch (error) {
    console.error("Error fetching assigned KPI:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch assigned KPI" },
      { status: 500 },
    );
  }
}

/**
 * PUT function to update an assigned KPI, with enhanced data handling.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    const { id } = params;
    const kpiId = String(id);

    const body = await request.json();
    const {
      kpi_status,
      comments,
      elements,
      completed_date,
      current_value,
      kpi_description,
      form_responses,
      dept_pillar_id,
      dept_id,
    } = body;

    // Check if assigned KPI exists and get its related data
    const existingKpi = await prisma.departmentKpi.findUnique({
      where: { id: kpiId },
      include: {
        department_pillar: true,
        department: true,
      },
    });

    if (!existingKpi) {
      return NextResponse.json(
        { success: false, error: "Assigned KPI not found" },
        { status: 404 },
      );
    }

    // Optional: Validate dept_id if provided
    if (dept_id && existingKpi.dept_id !== dept_id) {
      return NextResponse.json(
        {
          success: false,
          error: "Cannot change the department of an assigned KPI",
        },
        { status: 400 },
      );
    }

    // Optional: If dept_pillar_id is being changed, ensure it belongs to the same department
    if (dept_pillar_id && dept_pillar_id !== existingKpi.dept_pillar_id) {
      const newPillar = await prisma.departmentPillar.findFirst({
        where: {
          id: dept_pillar_id,
          dept_id: existingKpi.dept_id,
        },
      });

      if (!newPillar) {
        return NextResponse.json(
          {
            success: false,
            error: "New pillar must belong to the same department",
          },
          { status: 400 },
        );
      }
    }

    // Update data preparation
    const updateData: any = {};

    if (dept_pillar_id) updateData.dept_pillar_id = dept_pillar_id;
    if (kpi_status !== undefined) updateData.kpi_status = kpi_status;
    if (comments !== undefined) updateData.comments = comments;
    if (elements) updateData.form_data = elements;
    if (completed_date) updateData.completed_date = new Date(completed_date);
    if (current_value !== undefined) updateData.current_value = current_value;
    if (kpi_description !== undefined)
      updateData.kpi_description = kpi_description;
    if (form_responses !== undefined)
      updateData.form_responses = form_responses;

    // Update the assigned KPI
    const updatedKpi = await prisma.departmentKpi.update({
      where: { id: kpiId },
      data: updateData,
      include: {
        department_pillar: true,
        department: true,
      },
    });

    // Return with transformed structure and department context
    return NextResponse.json({
      success: true,
      message: "Assigned KPI updated successfully",
      assignedKpi: {
        id: updatedKpi.id,
        dept_pillar_id: updatedKpi.dept_pillar_id,
        dept_id: updatedKpi.dept_id,
        kpi_name: updatedKpi.kpi_name,
        kpi_status: updatedKpi.kpi_status,
        assigned_date: updatedKpi.assigned_date,
        completed_date: updatedKpi.completed_date,
        comments: updatedKpi.comments,
        current_value: updatedKpi.current_value,
        kpi_description: updatedKpi.kpi_description,
        form_responses: updatedKpi.form_responses,
        department: updatedKpi.department,
        department_pillar: updatedKpi.department_pillar,
        elements: updatedKpi.form_data,
      },
    });
  } catch (error) {
    console.error("Error updating assigned KPI:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update assigned KPI" },
      { status: 500 },
    );
  }
}

/**
 * DELETE function to delete an assigned KPI.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    const { id } = params;
    const kpiId = String(id);

    // Check if assigned KPI exists
    const existingKpi = await prisma.departmentKpi.findUnique({
      where: { id: kpiId },
      include: {
        department_pillar: true,
        department: true,
      },
    });

    if (!existingKpi) {
      return NextResponse.json(
        { success: false, error: "Assigned KPI not found" },
        { status: 404 },
      );
    }

    // Keep track of the department and pillar info for the response
    const deletedInfo = {
      dept_pillar_id: existingKpi.dept_pillar_id,
      dept_id: existingKpi.dept_id,
      kpi_name: existingKpi.kpi_name,
    };

    // Delete the assigned KPI
    await prisma.departmentKpi.delete({
      where: { id: kpiId },
    });

    return NextResponse.json({
      success: true,
      message: "Assigned KPI deleted successfully",
      deleted: {
        id: kpiId,
        ...deletedInfo,
      },
    });
  } catch (error) {
    console.error("Error deleting assigned KPI:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete assigned KPI" },
      { status: 500 },
    );
  }
}

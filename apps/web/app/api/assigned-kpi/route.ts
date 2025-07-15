// ROUTE DISABLED: This API route is commented out due to backend revamp. Restore or update after backend changes.
/**
 * =============================
 * KPI Assignment API Handlers
 * =============================
 */

/*
 * =========================
 * GET function to fetch all assigned KPIs,
 * with optional filtering by dept_id and/or dept_pillar_id.
 * =========================
 */
/*
export async function GET(request: Request): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const departmentId = url.searchParams.get("dept_id");
    const pillarId = url.searchParams.get("dept_pillar_id");

    const where: any = {};

    if (pillarId) {
      where.dept_pillar_id = String(pillarId);
    }

    if (departmentId) {
      constdepartment_pillarInDept = await prisma.departmentPillar.findMany({
        where: { dept_id: String(departmentId) },
        select: { id: true },
      });

      const pillarIds =department_pillarInDept.map((p: any) => p.id);

      if (pillarId) {
        if (!pillarIds.includes(String(pillarId))) {
          return NextResponse.json(
            {
              success: false,
              error: `Pillar ID ${pillarId} does not belong to Department ID ${departmentId}`,
            },
            { status: 400 },
          );
        }
      } else {
        where.dept_pillar_id = { in: pillarIds };
      }
    }

    const assignedKpis = await prisma.departmentKpi.findMany({
      where,
      include: {
        department_pillar: true,
        department: true,
      },
    });

    const kpiNames = [...new Set(assignedKpis.map((kpi: any) => kpi.kpi_name))];

    const transformedKpis = assignedKpis.map((kpi: any) => ({
      id: kpi.id,
      dept_pillar_id: kpi.dept_pillar_id,
      dept_id: kpi.dept_id,
      kpi_name: kpi.kpi_name,
      kpi_status: kpi.kpi_status,
      assigned_date: kpi.assigned_date,
      completed_date: kpi.completed_date,
      comments: kpi.comments,
      current_value: kpi.current_value,
      kpi_description: kpi.kpi_description,
      form_responses: kpi.form_responses,
      department_pillar: kpi.department_pillar,
      department: kpi.department,
      elements: kpi.form_data,
    }));

    return NextResponse.json({
      success: true,
      assignedKpis: transformedKpis,
    });
  } catch (error) {
    console.error("Error fetching assigned KPIs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch assigned KPIs" },
      { status: 500 },
    );
  }
}
*/

/*
 * =========================
 * POST function to assign KPI(s) to a pillar,
 * ensuring the pillar belongs to the correct department.
 * =========================
 */
/*
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const {
      departmentId,
      pillarId,
      kpiIds,
      kpi_name,
      kpi_status,
      current_value,
      kpi_description,
      comments,
      form_responses,
    } = body;

    if (!departmentId) {
      return NextResponse.json(
        { success: false, error: "Department ID is required" },
        { status: 400 },
      );
    }

    if (!pillarId) {
      return NextResponse.json(
        { success: false, error: "Pillar ID is required" },
        { status: 400 },
      );
    }

    if (!kpiIds || !Array.isArray(kpiIds) || kpiIds.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one KPI ID is required" },
        { status: 400 },
      );
    }

    const pillar = await prisma.departmentPillar.findFirst({
      where: {
        dept_pillar_id: Number(pillarId),
        dept_id: Number(departmentId),
      },
    });

    if (!pillar) {
      return NextResponse.json(
        {
          success: false,
          error: `Pillar ID ${pillarId} does not belong to Department ID ${departmentId}`,
        },
        { status: 404 },
      );
    }

    const departmentPillars = await prisma.departmentPillar.findMany({
      where: {
        dept_id: Number(departmentId),
      },
      select: {
        dept_pillar_id: true,
      },
    });

    const departmentPillarIds = departmentPillars.map((p) => p.dept_pillar_id);

    const assignedKpis = [];

    for (const kpiId of kpiIds) {
      const kpiTemplate = await prisma.kpiTemplate.findUnique({
        where: { kpi_id: Number(kpiId) },
      });

      if (!kpiTemplate) {
        return NextResponse.json(
          { success: false, error: `KPI template with ID ${kpiId} not found` },
          { status: 404 },
        );
      }

      const assignedKpiName = kpi_name || kpiTemplate.kpi_name;

      const existingKpi = await prisma.departmentKpi.findFirst({
        where: {
          kpi_name: assignedKpiName,
          dept_pillar_id: {
            in: departmentPillarIds,
          },
        },
        include: {
          pillar: true,
        },
      });

      if (existingKpi) {
        return NextResponse.json(
          {
            success: false,
            error: `KPI "${assignedKpiName}" is already assigned to pillar "${existingKpi.pillar.pillar_name}" in Department ID ${departmentId}`,
          },
          { status: 409 },
        );
      }

      const assignedKpi = await prisma.departmentKpi.create({
        data: {
          dept_pillar_id: Number(pillarId),
          kpi_name: assignedKpiName,
          kpi_status: kpi_status || "Not Started",
          form_data: kpiTemplate.form_data as unknown as Prisma.InputJsonValue,
          assigned_date: new Date(),
          completed_date: null,
          comments: comments || "",
          current_value:
            current_value !== undefined ? current_value : kpiTemplate.current_value,
          kpi_description: kpi_description || kpiTemplate.kpi_description || "",
          form_responses: form_responses || null,
        },
        include: {
          pillar: {
            include: {
              department: true,
            },
          },
        },
      });

      assignedKpis.push({
        assigned_kpi_id: assignedKpi.assigned_kpi_id,
        dept_pillar_id: assignedKpi.dept_pillar_id,
        kpi_name: assignedKpi.kpi_name,
        kpi_status: assignedKpi.kpi_status,
        assigned_date: assignedKpi.assigned_date,
        completed_date: assignedKpi.completed_date,
        comments: assignedKpi.comments,
        current_value: assignedKpi.current_value,
        kpi_description: assignedKpi.kpi_description,
        form_responses: assignedKpi.form_responses,
        department: assignedKpi.pillar.department,
        pillar: assignedKpi.pillar,
        id: `assigned-${assignedKpi.assigned_kpi_id}`,
        elements: assignedKpi.form_data,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully assigned ${assignedKpis.length} KPI(s)`,
      assignedKpis,
    });
  } catch (error) {
    console.error("Error assigning KPI(s):", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: `Failed to assign KPI(s): ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to assign KPI(s)" },
      { status: 500 },
    );
  }
}
*/

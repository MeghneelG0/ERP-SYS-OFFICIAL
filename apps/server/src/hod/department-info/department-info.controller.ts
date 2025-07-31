import { Controller, Post, Body, UseGuards, Delete, Param, Patch, Get } from '@nestjs/common';
import { DepartmentInfoService } from './department-info.service';
import { CreateDepartmentInfoDto } from './dto/create-department-info.dto';
import { UpdateDepartmentInfoDto } from './dto/update-department-info.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { RequestUser } from 'src/auth/dto/request-user.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Department Info')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/hod/department-info')
export class DepartmentInfoController {
  constructor(private readonly departmentInfoService: DepartmentInfoService) {}

  @Post()
  @ApiOperation({ summary: "Create department profile information for the HOD's department" })
  async createDepartmentInfo(@CurrentUser() user: RequestUser, @Body() dto: CreateDepartmentInfoDto) {
    // The service will now fetch the department ID based on the user's ID
    return this.departmentInfoService.createDepartmentInfo(user.id, user.role, dto);
  }

  @Get()
  @ApiOperation({ summary: "Get the latest department profile information for the current HOD's department" })
  async getDepartmentInfo(@CurrentUser() user: RequestUser) {
    // The service will now fetch the department ID based on the user's ID
    return this.departmentInfoService.getDepartmentInfo(user.id, user.role);
  }

  @Get('by-id/:id')
  @ApiOperation({ summary: 'Get department profile information by its unique ID' })
  async getDepartmentInfoById(@Param('id') id: string) {
    return this.departmentInfoService.getDepartmentInfoById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update department profile information by its unique ID' })
  async updateDepartmentInfo(
    @CurrentUser() user: RequestUser,
    @Param('id') id: string,
    @Body() dto: UpdateDepartmentInfoDto,
  ) {
    return this.departmentInfoService.updateDepartmentInfo(user.id, user.role, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete department profile information by its unique ID' })
  async deleteDepartmentInfo(@CurrentUser() user: RequestUser, @Param('id') id: string) {
    return this.departmentInfoService.deleteDepartmentInfo(user.id, user.role, id);
  }
}

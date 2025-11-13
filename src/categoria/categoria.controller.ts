import { Controller, Get, Post, Body, Param, Delete, Put, Query, BadRequestException, UseGuards } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './schemas/categoria.schema';
import { FilterCategoriaDto } from './dto/filterCategoria.dto';
import { ObjectId } from 'bson';
import { RolesGuard } from 'src/auth/guards/jwt-roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';


@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  async showCategories(): Promise<Categoria[]> {
    return this.categoriaService.showCategorias();
  }

  @Post()
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('admin')
  async createCategory(@Body() body: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriaService.create(body);
  }

  @Get(':id')
  async getCategory(@Param('id') id: string): Promise<Categoria> {
    if (!ObjectId.isValid(id)) throw new BadRequestException('Invalid ID');
    return this.categoriaService.getCategoria(id);
  }

  @Get('filter/query')
  async getCategorias(
    @Query() filter: FilterCategoriaDto,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string = 'nombre',
  ): Promise<{
    data: Categoria[];
    page: number;
    limit: number;
    total: number;
  }> {
    return this.categoriaService.getCategorias(filter, page, limit, sort);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('admin')
  async updateCategory(
    @Body() body: UpdateCategoriaDto,
    @Param('id') id: string,
  ): Promise<Categoria> {
    return this.categoriaService.updateCategoria(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('admin')
  async deleteCategory(@Param('id') id: string): Promise<{ message: string }> {
    return this.categoriaService.delete(id);
  }
}

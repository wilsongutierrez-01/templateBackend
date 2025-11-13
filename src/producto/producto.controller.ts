import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto } from './dto/producto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Producto } from './schemas/producto.schema';
import { FilterProductoDto } from './dto/filterProducto.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/jwt-roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ObjectId } from 'bson';
@Controller('producto')
export class ProductoController {
  constructor(private readonly productosService: ProductoService) {}

  @Get()
  showProductos(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string = 'nombre',
  ): Promise<{
    data: Producto[];
    page: number;
    limit: number;
    total: number;
  }> {
    return this.productosService.showProductos(page, limit, sort);
  }

  @Get(':id')
  getProducto(@Param('id') id: string): Promise<Producto> {
    if (!ObjectId.isValid(id)) throw new BadRequestException('Invalid ID');
    return this.productosService.getProducto(id);
  }

  @Get('filter/query')
  async getProductos(
    @Query() filter: FilterProductoDto,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string = 'nombre',
  ): Promise<{
    data: Producto[];
    page: number;
    limit: number;
    total: number;
  }> {
    return this.productosService.getProductos(filter, page, limit, sort);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('file'))
  async createProducto(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' }),
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 5,
            message: 'File too large. Max size is 10MB',
          }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,

    @Body() body: ProductoDto,
  ): Promise<Producto> {
    return this.productosService.createProducto(body, file);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('file'))
  async updateProducto(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' }),
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 5,
            message: 'File too large. Max size is 10MB',
          }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,

    @Body() body: ProductoDto,
    @Param('id') id: string,
  ): Promise<Producto> {
    return this.productosService.updateProducto(id, body, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async deleteProducto(@Param('id') id: string): Promise<{ message: string }> {
    if (!ObjectId.isValid(id)) throw new BadRequestException('Invalid ID');
    return this.productosService.deleteProducto(id);
  }

}

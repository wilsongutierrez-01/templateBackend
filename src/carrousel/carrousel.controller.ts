import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { CarrouselService } from './carrousel.service';
import { CreateCarrouselDto } from './dto/create-carrousel.dto';
import { UpdateCarrouselDto } from './dto/update-carrousel.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/jwt-roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'bson';

@Controller('carrousel')
export class CarrouselController {
  constructor(private readonly carrouselService: CarrouselService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('file'))
  async create(
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
    @Body()
    createCarrouselDto: CreateCarrouselDto,
  ) {
    return this.carrouselService.create(createCarrouselDto, file);
  }

  @Get()
  findAll() {
    return this.carrouselService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!ObjectId.isValid(id)) throw new BadRequestException('Invalid ID');
    return this.carrouselService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('file'))
  async update(
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
    @Param('id') id: string,
    @Body() updateCarrouselDto: UpdateCarrouselDto,
  ) {
    return this.carrouselService.update(id, updateCarrouselDto, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    if (!ObjectId.isValid(id)) throw new BadRequestException('Invalid ID');
    return this.carrouselService.remove(id);
  }
}

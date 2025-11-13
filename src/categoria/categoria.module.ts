import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categoria, CategoriaSchema } from './schemas/categoria.schema';
import { RolesGuard } from 'src/auth/guards/jwt-roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Categoria.name,
        schema: CategoriaSchema,
      }
    ])
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService, RolesGuard],
})
export class CategoriaModule {}

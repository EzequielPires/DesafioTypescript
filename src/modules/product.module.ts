import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "src/controllers/product.controller";
import { Product } from "src/models/product.entity";
import { ProductService } from "src/services/product.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductController],
    providers: [ProductService]
}) export class ProductModule {}
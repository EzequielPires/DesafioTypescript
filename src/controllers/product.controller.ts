import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Product } from "src/models/product.entity";
import { ProductService } from "src/services/product.service";

@Controller('/products')
export class ProductController {
    constructor(private readonly service: ProductService) { }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Post()
    create(@Body() product: Product) {
        return this.service.create(product);
    }

    @Get('/:productId')
    findOne(@Param('productId') productId: number) {
        return this.service.findOne(productId);
    }

    @Put('/:productId')
    update(@Param('productId') productId: number, @Body() product: Product) {
        return this.service.update(productId, product);
    }

    @Delete('/:productId')
    delete(@Param('productId') productId: number) {
        return this.service.delete(productId);
    }
}
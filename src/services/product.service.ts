import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/models/product.entity";
import { Repository } from "typeorm";

export class ProductService {
    constructor(@InjectRepository(Product) private repository: Repository<Product>) {}

    async findAll() {
        try {
            const products = await this.repository.find({ order: {
                updatedAt: "DESC"
            }, });
            return products;
        } catch(error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }

    async create(body: Product) {
        try {
            const product = this.repository.create(body);
            return await this.repository.save(product);
        } catch(error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }

    async findOne(id: number) {
        try {
            const product = await this.repository.findOne({where: {id}});
            return product;
        } catch(error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }

    async update(id: number, body: Product) {
        try {
            const product = await this.repository.findOne(id);
            if(!product) {
                throw new NotFoundException(`Não foi encontrado nenhum produto com id ${id}`);
            }
            await this.repository.update({ id }, body);

            return await this.repository.findOne(id);
        } catch(error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }

    async delete(id: number) {
        try {
            const product = await this.repository.findOne(id);
            if(!product) {
                throw new NotFoundException(`Não foi encontrado nenhum produto com id ${id}`);
            }
            await this.repository.delete(id);

            return `Produto ${product.name} com o id ${id} deletado com sucesso`;
        } catch(error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }

}
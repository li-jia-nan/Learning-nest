import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Coffee } from "./entities/coffees.entity";
import type { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";

@Injectable()
export class CoffeesService {
  constructor(@InjectRepository(Coffee) private readonly coffeeRepository: Repository<Coffee>) {}

  findAll() {
    return this.coffeeRepository.find();
  }
  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOneBy({ id });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }
  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }
  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({ id: +id, ...updateCoffeeDto });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }
  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}

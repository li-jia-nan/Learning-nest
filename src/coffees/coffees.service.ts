import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { Coffee } from "./entities/coffee.entity";
import { Flavor } from "./entities/flavor.entity";

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}
  findAll() {
    return this.coffeeRepository.find({ relations: ["flavors"] });
  }
  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({ where: { id }, relations: ["flavors"] });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }
  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      (createCoffeeDto.flavors || []).map(this.preloadFlavorByName),
    );
    const coffee = this.coffeeRepository.create({ ...createCoffeeDto, flavors });
    return this.coffeeRepository.save(coffee);
  }
  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = await Promise.all(
      (updateCoffeeDto.flavors || []).map(this.preloadFlavorByName),
    );
    const coffee = await this.coffeeRepository.preload({ id: +id, ...updateCoffeeDto, flavors });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }
  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({ where: { name } });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}

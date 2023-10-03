import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";
import { CoffeesService } from "./coffees.service";

@Controller("coffees")
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  findAll() {
    return this.coffeesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.coffeesService.remove(id);
  }
}

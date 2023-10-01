import { CoffeesService } from "./coffees.service";
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";

@Controller("coffees")
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  findAll(@Query() paginationQuery: any) {
    // const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") params: string) {
    return this.coffeesService.findOne(params);
  }

  @Post()
  create(@Body() body: any) {
    return this.coffeesService.create(body);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body: any) {
    return this.coffeesService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.coffeesService.remove(id);
  }
}

import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';

@Controller('houses')
export class HousesController {
    constructor(private readonly housesService: HousesService){

    }

    // GET /houses 
    @Get()
    getHouses(){
        return this.housesService.getAllHouse();
    }

    // GET /houses/:id
    @Get(':id')
    getHouseById(@Param('id', ParseIntPipe) id: number){
        try{
            return this.housesService.getHouseById(id);
        } catch(e){
            throw new NotFoundException()
        }
    }

    // POST /houses
    @Post()
    createNewHouse(@Body(new ValidationPipe()) createHouseDto: CreateHouseDto) {
        return this.housesService.createNewHouse(createHouseDto)
    }

    // PUT /houses/:id
    @Put(':id')
    updateHouse(@Param('id', ParseIntPipe) id:number, updateHouseDto:UpdateHouseDto){
        try{
            return this.housesService.updateHouse(id, updateHouseDto)
        } catch(e){
            throw new NotFoundException;
        }
    }

    // DELETE /houses/:id
    @Delete(':id')
    deleteHouse(@Param('id', ParseIntPipe) id:number){
        try{
            return this.housesService.removeHouse(id)
        } catch(e){
            throw new NotFoundException()
        }
    }
}

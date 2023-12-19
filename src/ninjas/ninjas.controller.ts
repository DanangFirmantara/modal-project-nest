import { BadGatewayException, BadRequestException, Body, ConflictException, Controller, Delete, ForbiddenException, GatewayTimeoutException, Get, GoneException, HttpVersionNotSupportedException, ImATeapotException, InternalServerErrorException, MethodNotAllowedException, NotAcceptableException, NotFoundException, NotImplementedException, Param, PayloadTooLargeException, Post, PreconditionFailedException, Put, Query, RequestTimeoutException, ServiceUnavailableException, UnauthorizedException, UnprocessableEntityException, UnsupportedMediaTypeException } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { NotFoundError } from 'rxjs';

//depedencies injection
// const service = new NinjasService()
// const controller = new NinjasController(service)

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjaService: NinjasService){};

    //GET /ninjas?weapon=fast --> []
    @Get()
    getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
        return this.ninjaService.getNinjas(weapon);
    }

    //GET /ninjas/:id --> { ... }
    @Get(':id')
    getOneNinja(@Param('id') id:string){
        try{
            return this.ninjaService.getNinja(+id);
        } catch(err){
            throw new NotFoundException()
        }
    }

    //POST /ninjas
    @Post()
    createNinja(@Body() createNinjaDto: CreateNinjaDto){
        return this.ninjaService.createNinja(createNinjaDto)
    }
    //PUT /ninjas/:id --> { ... }
    @Put(':id')
    updateNinja(@Param('id') id:string, @Body() updateNinjaDto: UpdateNinjaDto){
        return this.ninjaService.updateNinja(+id, updateNinjaDto)
    }
    //DELETE /ninjas/:id
    @Delete(':id')
    removeNinja(@Param('id') id:string){
        return this.ninjaService.removeNinja(+id)
    }

}

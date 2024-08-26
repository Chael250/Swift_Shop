import { Controller, Get, Post, Body, Query, Param, Patch, Delete, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto, UpdateUserDto } from './dto/users.dto';
import { Public } from 'src/common/decorators';
import { AdminGuard } from 'src/common/guards';
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiSecurity, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags("Users")
@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}

    @ApiResponse({status:201, description: "Successfully created a user"})
    @ApiBadRequestResponse({ description: "Bad Request"})
    @Public()
    @Post()
    async create(@Body(ValidationPipe) userCreateDto: UserDto){
        return this.usersService.create(userCreateDto)
    }

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @Public()
    @UseGuards(AdminGuard)
    @Get()
    async findAll(@Query("isAdmin") isAdmin?:Boolean){
        return this.usersService.findAll(isAdmin)
    }

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiNotFoundResponse()
    @ApiBearerAuth()
    @Public()
    @UseGuards(AdminGuard)
    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) id:number){
        return this.usersService.findOne(id)
    }

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiNotFoundResponse()
    @ApiBadRequestResponse({ description: "Bad Request"})
    @Public()
    @UseGuards(AdminGuard)
    @Patch(":id")
    async update(@Param("id", ParseIntPipe) id:number, @Body(ValidationPipe) userUpdate: UpdateUserDto){
        return this.usersService.update(id, userUpdate)
    }

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @ApiForbiddenResponse()
    @ApiNotFoundResponse()
    @Public()
    @UseGuards(AdminGuard)
    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number){
        return this.usersService.delete(id)
    }
}

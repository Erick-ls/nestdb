import { Body, Controller, Get, Post , Param, ParseIntPipe, NotFoundException, Delete, Patch } from '@nestjs/common';
import { CretaeUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

import { User } from './user.entity';
import { UpdateUserDTO } from './dto/update-user';

@Controller('users')
export class UsersController {
    constructor(private userService : UsersService){}

    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    async getUser(@Param('id',ParseIntPipe)id: number): Promise<User> {
        console.log(id)
        console.log(typeof(id))
        const user = await this.userService.getUser(id);
        // Check if the result is not a User instance
        if (!user || !(user instanceof User)) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }
    
    @Post()
    async createUser(@Body() newUser: CretaeUserDto): Promise<User> {
        const result = await this.userService.createUser(newUser);
        if (result instanceof Error) {
            throw result;
        }
        return result;
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
        this.userService.deleteUser(id);
    }

    @Patch(':id')
    upDateUser(@Param('id', ParseIntPipe) id: number, @Body()user :UpdateUserDTO){
        this.userService.UpdateUser(id,user)

    }
}

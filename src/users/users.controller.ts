import { Body, Controller, Get, Post , Param, ParseIntPipe} from '@nestjs/common';
import { CretaeUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private userService : UsersService){}

    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    getUser(@Param('id',ParseIntPipe)id: number): Promise<User> {
        console.log(id)
        console.log(typeof(id))
        return this.userService.getUser(id);
    }
    
    @Post()
    createUser(@Body() newUser:CretaeUserDto):Promise<User>{
        return this.userService.createUser(newUser)


    }
}

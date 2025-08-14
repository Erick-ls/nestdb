import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { User } from './user.entity';
import { create } from 'domain';
import {CretaeUserDto} from './dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user';

@Injectable()
export class UsersService{
   

    constructor(@InjectRepository(User)private userRepository: Repository<User>) {}

deleteUser(id:number){
    this.userRepository.delete({id})

}
async createUser(user:CretaeUserDto){
    const userFound = this.userRepository.findOne({
        where:{
            username :user.username
        }

        })
        if(await userFound) {
            return  new HttpException('User alredy exist', HttpStatus.CONFLICT)
            
        }
   
    const newUser = this.userRepository.create(user)
    return this.userRepository.save(newUser)
}
getUsers() {
    return this.userRepository.find()

}

getUser(id:number){
    return this.userRepository.findOne({
        where:{
            id

        }
    })
}

 UpdateUser(id: number, User: UpdateUserDTO) {
    return this.userRepository.update(id, User);

    }

}
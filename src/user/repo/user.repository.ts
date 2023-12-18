// user/entity/user.repository.ts
import {  Repository } from 'typeorm';
import { User } from '../entities/user.entity';


export class UserRepository extends Repository<User> {
  // Add custom repository methods if needed
}
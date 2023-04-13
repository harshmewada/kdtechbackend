import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PERMISSIONS } from 'src/constants';
import { AdminDto } from './dto/admins.dto';
import { Admin } from './schema/admins.schema';

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admin.name) private admins: Model<Admin>) {}

  async create(data: AdminDto) {
    try {
      const existing = await this.admins.findOne({ phone: data.phone });
      if (existing) {
        throw new ConflictException(
          'Admin with same phone number already exists',
        );
      }

      await this.admins.create({
        ...data,
        permissions: PERMISSIONS[data.role],
      });

      return;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

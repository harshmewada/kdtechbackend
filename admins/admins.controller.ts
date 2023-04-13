import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminsService } from './admins.service';
import { AdminDto } from './dto/admins.dto';

@ApiTags('Admin')
@Controller({ path: 'admin' })
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  create(@Body() admin: AdminDto) {
    return this.adminsService.create(admin);
  }
}

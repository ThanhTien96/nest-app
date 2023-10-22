import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { IAccount } from './account.model';
import { CreateAccountDto } from './dto/account.dto';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  getAllAccount(): IAccount[] {
    return this.accountService.getAllAccount();
  }

  @Post()
  createAccount(@Body() createAccount: CreateAccountDto): IAccount {
    return this.accountService.createAccount(createAccount);
  }
}

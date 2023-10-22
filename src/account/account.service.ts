import { Injectable } from '@nestjs/common';
import { IAccount } from './account.model';
import { CreateAccountDto } from './dto/account.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AccountService {
  private accounts: IAccount[] = [];

  getAllAccount(): IAccount[] {
    return this.accounts;
  }

  createAccount(createAccountDto: CreateAccountDto): IAccount {
    const { userName, password, age } = createAccountDto;
    const account: IAccount = {
      id: uuid(),
      userName,
      password,
      age,
    };
    this.accounts.push(account);
    return account;
  }
}

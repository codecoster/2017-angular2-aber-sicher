import { Component, OnInit } from '@angular/core';

import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [AccountService]
})
export class AccountComponent implements OnInit {

  private balance: number;
  private currency: string;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAccountData()
    .subscribe((account)=>{
      this.balance = account.balance;
      this.currency = account.currency;
    })
  }

}

import { User } from './../_models/user';
import { AccountService } from './../_services/account.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() registerCancel = new EventEmitter();
  model: any = {};
  constructor(private accountService: AccountService) { }
  register() {
    this.accountService.register(this.model).subscribe((response:User) => {
      console.log(response);
      this.cancel();
    }, error =>
      console.log(console.error())
    )
  }

  cancel() {
    console.log("canceled");
    this.registerCancel.emit(false);
  }


  ngOnInit(): void {
  }

}

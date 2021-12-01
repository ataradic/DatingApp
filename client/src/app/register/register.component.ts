import { User } from './../_models/user';
import { AccountService } from './../_services/account.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() registerCancel = new EventEmitter();
  model: any = {};
  constructor(private accountService: AccountService, private toastr: ToastrService) { }
  register() {
    this.accountService.register(this.model).subscribe((response) => {
      console.log(response);
      this.toastr.success("register succes");
      this.cancel();
    }, error => {
      this.toastr.error(error.error);
      console.log(error.error);
    }
    );
  }

  cancel() {
    console.log("canceled");
    this.registerCancel.emit(false);
  }


  ngOnInit(): void {
  }

}

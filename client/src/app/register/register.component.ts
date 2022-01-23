import { User } from './../_models/user';
import { AccountService } from './../_services/account.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() registerCancel = new EventEmitter();
  registerForm: FormGroup;
  maxDate:Date;
  validationErrors:string[]=[];
  constructor(private accountService: AccountService, private toastr: ToastrService,
    private router :Router,private fb: FormBuilder) { }
  inititializeForm() {

    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.minLength(4), Validators.maxLength(8), Validators.required]],
      confirmPassword: ['', [Validators.required, this.matchConfirm('password')]]
    });
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    });
  }
  matchConfirm(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : { isMatching: true };
    }
  }
  register() {
    this.accountService.register(this.registerForm.value).subscribe((response) => {
       this.router.navigateByUrl('/members');
      }, error => {
      this.validationErrors = error;
      console.log(this.validationErrors);
      }
    );
  }

  cancel() {
    console.log("canceled");
    this.registerCancel.emit(false);
  }


  ngOnInit(): void {
    this.inititializeForm();
    this.maxDate=new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  }

}

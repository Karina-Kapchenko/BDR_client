import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    submit_password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  public error_msg: any = '';

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitReigsterForm() {
    if(this.registerFormGroup.invalid) {
      this.error_msg = 'Невірні дані'
      return
    }

    const registerFormData = this.registerFormGroup.getRawValue();
    if(registerFormData.password !== registerFormData.submit_password) {
      this.error_msg = 'Паролі не співпадають'
      return
    } 

    this.apiService.register({...registerFormData, role:1}).subscribe((registerRes: any) => {
      console.log(registerRes);
      if(registerRes.status) {
        this.router.navigate(['/auth/login'])
      } else {
        this.error_msg = registerRes.error
      }
    })
  }

  toSignIn() {
    this.router.navigate(['/auth/login'])
  }

}

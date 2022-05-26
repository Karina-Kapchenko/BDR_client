import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public error_msg = ''
  public loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmitLoginForm() {
    const formData = this.loginFormGroup.getRawValue();
    if (this.loginFormGroup.invalid) {
      return;
    }
    this.apiService.login(formData).subscribe((loginResp: any) => {
      if(loginResp.status) {
        this.userService.user = loginResp.data;
        localStorage.setItem('userId', loginResp.data.id);
        this.router.navigate(['/home/websites']);
      } else {
        this.error_msg = loginResp.error
      }
    });
  }

  toSignUp() {
    this.router.navigate(['/auth/register'])
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  onSubmitReigsterForm() {
    if(this.registerFormGroup.invalid) {
      return
    }

    const registerFormData = this.registerFormGroup.getRawValue();
    if(registerFormData.password !== registerFormData.submit_password) {
      return
    } 

    this.apiService.register({...registerFormData, role:1}).subscribe((registerRes: any) => {
      console.log(registerRes);
    })
  }

}

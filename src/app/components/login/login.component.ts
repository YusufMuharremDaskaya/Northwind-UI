import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup

  constructor(private formBuilder: FormBuilder, private authService:AuthService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email:["", [Validators.required, Validators.email]],
      password:["", [Validators.required, Validators.minLength(8)]]
    })
  }

  login() {
    if(this.loginForm.valid){
      let loginModel = Object.assign({}, this.loginForm.value)
      console.log(loginModel)
      this.authService.login(loginModel).subscribe({
        next: result => {
           this.toastr.info("Giriş Başarılı")
           localStorage.setItem("token", result.data.token)
      },
        error: errorResult => {
          this.toastr.error(errorResult.error)
        }
    
    })
    }
    
  }

}

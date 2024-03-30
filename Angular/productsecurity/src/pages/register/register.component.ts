import { Component} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Remova ReactiveFormsModule
import { RegisterService } from "../../services/register.service";
import { Router, RouterModule } from "@angular/router";
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone:true,
  imports:[MatButtonToggleModule, ReactiveFormsModule, RouterModule]
})
export class RegisterComponent  {
  registerForm: FormGroup;

  message: string = '';
  role:string ='';

  constructor(private formBuilder: FormBuilder, private service: RegisterService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      role: ['']
    });
  }


  isAdmin() {
    this.role = "ADMIN";
    this.registerForm.patchValue({
      role: this.role 
    });
  }

  isUser() {
    this.role = "USER";
    this.registerForm.patchValue({
      role: this.role
    });
  }


  registerUser() {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this.service.register(this.registerForm.value).subscribe(
        () => {

          this.message = 'Conta criada com sucesso! Você será redirecionado...';

          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2000);
        },
        (error) => {

          if (error.error) {
            this.message = 'Erro ao criar conta: ' + error.error;
          } else {
            this.message = 'Erro ao criar conta: ' + error.message;
          }
        }
      );
    }
  }

}

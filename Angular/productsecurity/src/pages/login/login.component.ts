import { Component } from '@angular/core';
import { LoginDto } from '../../models/login-dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router, RouterModule } from '@angular/router';
import { Token } from '../../models/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule]
})
export class LoginComponent {
  form!: FormGroup;
  login!: LoginDto;
  message: string = '';

  constructor(private register: RegisterService, private router: Router, private formBuilder: FormBuilder, private service: RegisterService) {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
    if (this.service.isAuthenticated()) {
      this.router.navigate(['/products']);
    }
  }


  logOn() {
    const loginDto: LoginDto = this.form.value;
    this.service.login(loginDto).subscribe(
      (response: Token) => {
        const accessToken = response.token;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          console.log('Autenticação bem-sucedida!');
          this.router.navigate(['products']);
        } else {
          console.error('Token de autorização não encontrado na resposta.');
        }
      },
      error => {
        console.error('Autenticação falhou:', error);
      }
    );
  }








}

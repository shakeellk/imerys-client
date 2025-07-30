import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  private router = inject(Router);
  private userService = inject(UserService);
  private fb = inject(FormBuilder);

  loginData = {
    username: 'Manohar',
    password: "manu123"
  };

  usernamePattern = /^[a-zA-Z]+$/;
  rememberme = false;
  passwordInputType = "password";

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.pattern(this.usernamePattern)]],
    password: ['', Validators.required]
  });

  handlePasswordInputChange(type: string) {
    this.passwordInputType = type;
  }

  async handleLogin() {
    if (
      this.loginForm.value.username !== this.loginData.username ||
      this.loginForm.value.password !== this.loginData.password
    ) {
      alert('Invalid Credentials');
      return;
    }
    this.router.navigate(['/']);
    this.userService.changeData(this.loginForm.value.username);
  }

  handleRememberMeToggle() {
    this.rememberme = !this.rememberme;
  }

  username = this.userService.getData();
}

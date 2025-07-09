import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StorageService } from '../../services/storage/storage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  loginForm!: FormGroup;
  isSpinning: boolean = false;

  constructor(private fb: FormBuilder,
    private service: AuthService,
    private message: NzMessageService,
    private router: Router) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSpinning = true;
    this.service.login(this.loginForm.value).subscribe((res) => {
      if (res.userId != null) {
        const user = {
          id: res.userId,
          role: res.userRole
        }
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt);
        if(StorageService.isAdminLoggedIn())
          this.router.navigateByUrl("/admin/dashboard");
        else if(StorageService.isCustomerLoggedIn())
          this.router.navigateByUrl("/customer/dashboard");
      } else {
        this.message.error("Bad credentials", { nzDuration: 5000});
      }
      this.isSpinning = false;
    });
  }

  getEmailError(): string | undefined {
    const control = this.loginForm.get('email');
    if (control?.touched && control.errors) {
      if (control.hasError('required')) return 'Please input your email!';
      if (control.hasError('email')) return 'Invalid email format!';
    }
    return undefined;
  }

  getPasswordError(): string | undefined {
    const control = this.loginForm.get('password');
    if (control?.touched && control.errors) {
      if (control.hasError('required')) return 'Password is required!';
    }
    return undefined;
  }
}

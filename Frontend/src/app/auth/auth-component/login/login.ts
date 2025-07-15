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

    this.service.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.isSpinning = false;

        // If token or user ID is missing — treat it as invalid login
        if (!res.userId || !res.jwt) {
          this.message.error("Bad credentials", { nzDuration: 5000 });
          this.loginForm.reset(); // ✅ clear the form
          return;
        }

        const user = {
          id: res.userId,
          role: res.userRole
        };
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt);

        // Navigate only if login data is valid
        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl("/admin/dashboard");
        } else if (StorageService.isCustomerLoggedIn()) {
          this.router.navigateByUrl("/customer/dashboard");
        } else {
          this.message.error("Unrecognized user role!", { nzDuration: 5000 });
          this.loginForm.reset(); // just in case
        }
      },
      error: (err) => {
        this.isSpinning = false; // ✅ stop spinner

        if (err.status === 401 || err.status === 403) {
          this.message.error("Bad credentials", { nzDuration: 5000 });
        } else {
          this.message.error("Something went wrong. Please try again!", { nzDuration: 5000 });
        }

        this.loginForm.reset(); // ✅ clear the form after failure
      }
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

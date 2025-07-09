import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class Signup {

  signupForm!: FormGroup;
  isSpinning: boolean = false;

  constructor(private fb: FormBuilder, private service: AuthService) {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      ]],
      confirmPassword: [null, [Validators.required]]
    }, { validators: this.matchPasswords('password', 'confirmPassword') });

  }

  // Custom validator for password matching
  matchPasswords(password: string, confirmPassword: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const pass = group.get(password)?.value;
      const confirm = group.get(confirmPassword)?.value;
      if (pass && confirm && pass !== confirm) {
        group.get(confirmPassword)?.setErrors({ confirm: true });
      } else {
        const errors = group.get(confirmPassword)?.errors;
        if (errors?.['confirm']) {
          delete errors['confirm'];
          if (Object.keys(errors).length === 0) {
            group.get(confirmPassword)?.setErrors(null);
          } else {
            group.get(confirmPassword)?.setErrors(errors);
          }
        }
      }
      return null;
    };
  }

  // Submit handler
  signup() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isSpinning = true;
    console.log('✅ Form Submitted:', this.signupForm.value);
    this.service.register(this.signupForm.value).subscribe((res) => {
      console.log(res);
    });

    setTimeout(() => {
      this.isSpinning = false;
    }, 1000);
  }

  // Dynamic error messages
  getNameError(): string | undefined {
    const control = this.signupForm.get('name');
    if (control?.touched && control.errors) {
      if (control.hasError('required')) return 'Please input your username!';
    }
    return undefined;
  }

  getEmailError(): string | undefined {
    const control = this.signupForm.get('email');
    if (control?.touched && control.errors) {
      if (control.hasError('required')) return 'Please input your email!';
      if (control.hasError('email')) return 'Invalid email format!';
    }
    return undefined;
  }

  getPasswordError(): string | undefined {
    const control = this.signupForm.get('password');
    if (control?.touched && control.errors) {
      if (control.hasError('required')) return 'Password is required!';
      if (control.hasError('pattern')) return 'Password must be 8+ chars with uppercase, lowercase, number, and symbol.';
    }
    return undefined;
  }

  getConfirmPasswordError(): string | undefined {
    const control = this.signupForm.get('confirmPassword');
    if (control?.touched && control.errors) {
      if (control.hasError('required')) return 'Please confirm your password!';
      if (control.hasError('confirm')) return 'Passwords do not match!';
    }
    return undefined;
  }


}

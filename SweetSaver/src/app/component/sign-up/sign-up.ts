import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../../services/auth';

type ToastType = 'success' | 'error' | 'info';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.css'],
})
export class SignUp implements OnInit {
  private auth = inject(Auth);
  private router = inject(Router);

  username = signal('');
  email = signal('');
  password = signal('');
  loading = signal(false);

  toastVisible = signal(false);
  toastMessage = signal('');
  toastType = signal<ToastType>('info');

  ngOnInit(): void {
    if (localStorage.getItem('access')) {
      this.showToastMessage('You are already logged in', 'info');
    }
  }

  showToastMessage(message: string, type: ToastType = 'info') {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.toastVisible.set(true);

    setTimeout(() => {
      this.toastVisible.set(false);
    }, 2500);
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loading()) return;

    if (!this.username().trim() || !this.email().trim() || !this.password().trim()) {
      this.showToastMessage('Please fill in all fields', 'error');
      return;
    }

    this.loading.set(true);

    const userData = {
      username: this.username().trim(),
      email: this.email().trim(),
      password: this.password().trim(),
    };

    this.auth.signup(userData).subscribe({
      next: (res) => {
        console.log(res);

        this.username.set('');
        this.email.set('');
        this.password.set('');
        this.loading.set(false);

        this.showToastMessage('Account created successfully. Sign in.', 'success');

        setTimeout(() => {
          this.router.navigate(['/sign-in']);
        }, 2000);
      },
      error: (err) => {
        console.log(err);

        if (err.error?.username) {
          this.showToastMessage(err.error.username[0], 'error');
        } else if (err.error?.email) {
          this.showToastMessage(err.error.email[0], 'error');
        } else if (err.error?.password) {
          this.showToastMessage(err.error.password[0], 'error');
        } else if (err.error?.detail) {
          this.showToastMessage(err.error.detail, 'error');
        } else if (err.error?.message) {
          this.showToastMessage(err.error.message, 'error');
        } else {
          this.showToastMessage('Signup failed', 'error');
        }

        this.loading.set(false);
      }
    });
  }
}
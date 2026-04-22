import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.css'],
})
export class SignIn implements OnInit {
  private auth = inject(Auth);

  logged = signal(false);
  username = signal('');
  password = signal('');
  message = signal('');
  loading = signal(false);

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('access')) {
      this.logged.set(true);
      this.message.set('You are already logged in');
    }
  }

  login(event: Event): void {
    event.preventDefault();

    if (this.loading()) return;

    if (!this.username().trim() || !this.password().trim()) {
      this.message.set('Please enter username and password');
      return;
    }

    this.loading.set(true);
    this.message.set('');

    this.auth.login(this.username(), this.password()).subscribe({
      next: (authToken) => {
        this.auth.saveTokens(authToken);

        this.auth.getProfile().subscribe({
          next: (user) => {
            this.auth.saveUserRole(user.role);

            this.logged.set(true);
            this.message.set('You are logged in successfully');

            this.username.set('');
            this.password.set('');
            this.loading.set(false);

            if (user.role === 'owner') {
              this.router.navigate(['/owner/dashboard']);
            } else {
              this.router.navigate(['/main/discover']);
            }
          },
          error: (err) => {
            console.log(err);
            this.message.set('Failed to load user profile.');
            this.loading.set(false);
          },
        });
      },
      error: (error) => {
        console.log(error);

        if (error.status === 401) {
          this.message.set('Invalid username or password');
        } else {
          this.message.set('Login failed. Please try again.');
        }

        this.loading.set(false);
      },
    });
  }
}
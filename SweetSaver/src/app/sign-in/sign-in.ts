import { RouterModule } from '@angular/router';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';

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

  ngOnInit(): void {
    if (localStorage.getItem('access')) {
      this.logged.set(true);
      this.message.set('You are already logged in');
    }
  }

  login(event: Event) {
    event.preventDefault();

    if (this.loading()) return;

    this.loading.set(true);

    this.auth.login(this.username(), this.password()).subscribe({
      next: authToken => {
        console.log(authToken);
        localStorage.setItem('access', authToken.access);
        localStorage.setItem('refresh', authToken.refresh);

        this.logged.set(true);
        this.message.set('You are logged in');

        this.username.set('');
        this.password.set('');

        this.loading.set(false);
      },
      error: error => {
        console.log(error);
        this.message.set('Login failed');
        this.loading.set(false);
      }
    });
  }
}

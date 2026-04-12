import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.css'],
})
export class SignUp implements OnInit {
  private auth = inject(Auth);
  private router = inject(Router);

  username = signal('');
  email = signal('');
  password = signal('');
  message = signal('');
  loading = signal(false);

  ngOnInit(): void {
    console.log('SignUp page loaded');
    this.message.set('');

    if (localStorage.getItem('access')) {
      this.message.set('You are already logged in');
      console.log('You are already logged in');
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loading()) return;

    this.loading.set(true);
    console.log('submit clicked');

    const userData = {
      username: this.username(),
      email: this.email(),
      password: this.password(),
    };

    this.auth.signup(userData).subscribe({
      next: (res) => {
        console.log(res);

      alert('Account created successfully');

        this.username.set('');
        this.email.set('');
        this.password.set('');

        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);

        if (err.error?.username) {
          this.message.set(err.error.username[0]);
        } else if (err.error?.email) {
          this.message.set(err.error.email[0]);
        } else {
          this.message.set('Signup failed');
        }

        this.loading.set(false);
      }
    });
  }
}
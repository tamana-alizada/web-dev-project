import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { Discover } from './component/discover/discover';
import { SignUp } from './component/sign-up/sign-up';
import { SignIn } from './component/sign-in/sign-in';
import { Shops } from './component/shops/shops';
import { Main } from './component/main/main';
import { Landing } from './component/landing/landing';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive, Discover, SignIn, SignUp, Shops, Main, Landing],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SweetSaver');
}

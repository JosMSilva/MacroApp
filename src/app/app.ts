import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Dashboard } from './dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MacroApp');
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidbarComponent } from './Components/sidbar/sidbar.component';
import { AskboxComponent } from './Components/askbox/askbox.component';
import { ReasultspaceComponent } from "./Components/reasultspace/reasultspace.component";
import { KeyboardDirective } from './Directives/keyboard.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidbarComponent, AskboxComponent, ReasultspaceComponent,ReasultspaceComponent,KeyboardDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'DeepSeek-Clone';
}

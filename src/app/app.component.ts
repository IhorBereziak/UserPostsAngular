import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginService} from './services/login.service';
import {UserService} from './services/user.service';
import {IUser} from './interfaces/user.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;
  users: Partial<IUser>[];

  constructor(private loginService: LoginService, private userService: UserService) {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  login(form: FormGroup): void {
    this.loginService.auth(form.value).subscribe((value) => {
      localStorage.setItem('access_token', value.access_token);
    });
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(value => this.users = value.user);
  }
}

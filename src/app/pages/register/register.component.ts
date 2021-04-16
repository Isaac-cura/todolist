import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { match } from '../../validators/passwordMatch.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(7), Validators.pattern(/(?:.*[0-9])(?:.*[A-Z])/)]],
    repeatedPassword: ['', [Validators.required, match("password")]]
  });
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}

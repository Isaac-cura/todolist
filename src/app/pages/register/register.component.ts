import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { IntermediaryService } from 'src/app/services/intermediary/intermediary.service';
import { match } from '../../validators/passwordMatch.validator';
import { RouterEnum } from '../../enums/router.enum';

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
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private intermediaryService: IntermediaryService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registerUser(rawData: any) {
    const user = this.prepareUserData(rawData);
    this.authenticationService.registerUser(user).pipe(
      this.intermediaryService.pipedToast("Usuario registrado con éxito")
    ).subscribe(() => {
      this.router.navigateByUrl(RouterEnum.authorization);
    });
  }

  private prepareUserData(user: any): User {
    delete user.repeatedPassword;
    return {...user};
  }

}

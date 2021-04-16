import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterEnum } from 'src/app/enums/router.enum';
import { IntermediaryService } from 'src/app/services/intermediary/intermediary.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(7), Validators.pattern(/(?=.*[0-9])(?=.*[A-Z])/)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private intermediaryService: IntermediaryService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  attemptLogin({email, password}) {
    this.authenticationService.login(email, password).pipe(
      this.intermediaryService.pipedToast((user) => `Bienvenido al sistema ${user.username}`, (error) => error)
    ).subscribe(_ => {
      this.router.navigateByUrl(RouterEnum.dashboard);
    })
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterEnum } from './enums/router.enum';
import { UtilEnums } from './enums/util.enums';
import { AuthenticationService } from './services/authentication/authentication.service';
import { IntermediaryService } from './services/intermediary/intermediary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private intermediaryService: IntermediaryService,
    private router: Router
  ) {
  }
  ngOnInit() {
    this.authenticationService.autehnticationSubject.pipe(filter(value => !value)).subscribe(end => {
      this.intermediaryService.showErrorToast("Su sesión expiró");
      this.router.navigateByUrl(RouterEnum.authorization);
    })
  }
}

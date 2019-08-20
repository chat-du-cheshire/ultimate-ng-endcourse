import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {FirebaseError} from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error: FirebaseError = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  async registerUser($event: FormGroup) {
    const {email, password} = $event.value;
    try {
      await this.authService.createUser(email, password);
      this.router.navigate(['/']);
    } catch (e) {
      this.error = e;
    }
  }
}

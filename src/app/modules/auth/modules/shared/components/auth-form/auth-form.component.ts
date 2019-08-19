import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  @Output() submitted = new EventEmitter<FormGroup>();

  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) {
  }

  get passwordInvalid() {
    const control = this.form.get('password');
    return control.hasError('required') && control.touched;
  }

  get emailFormatInvalid() {
    const control = this.form.get('email');
    return control.hasError('email') && control.touched;
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }
}

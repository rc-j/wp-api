import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { data } from '../core/errors.message';
import { RequestsService } from '../core/requests.service';
import { TokenInfo } from '../interfaces';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  data = data
  @Output() authEvent = new EventEmitter<string>()
  loginForm: FormGroup
  errorMessage = ''
  arrayOfErrors: string[] = []
  constructor(private requests: RequestsService,
    private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: '',
      password: ''
    })
  }
  onLogin() {
    this.arrayOfErrors = this.loginForm.get('username')?.errors ? Object.keys(this.loginForm.get('username')?.errors!) : []
    const error: string = this.arrayOfErrors[0]
    !!this.loginForm.get('username')?.errors ? this.errorMessage = data[this.arrayOfErrors[0]] : this.requests.validateUser(this.loginForm.value).subscribe(
      (res: TokenInfo) => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('username', res.user_display_name)
        this.authEvent.emit(res.user_display_name)
      },
      (err) => this.errorMessage = err.error.message
    )
  }
  ngOnInit(): void {
  }
}
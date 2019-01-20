import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public nickname = '';
  public roomName = 'room1';
  private form: FormGroup;

  constructor(private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      'nickname': new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
      'roomName': new FormControl(null, {
        validators: [
          Validators.required
        ]
      })
    });
  }

  onEnterRoom() {
    console.log('Button pressed!!');

    this.router.navigate(['/game', this.form.value.roomName, this.form.value.nickname]);
  }

}

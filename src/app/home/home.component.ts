import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public nickname = '';
  public roomName = 'room1';
  private form: FormGroup;

  constructor(private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {

    this.route.url.subscribe( (url: UrlSegment[]) => {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        /* Roomname and nickname must be provided, or the user will be redirected to the home room.*/
        if (url[0] && url[0].path === 'error' && paramMap.has('errorType')) {
          const errorType = paramMap.get('errorType');
          console.log(errorType);
        }
      });
    });


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

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLoaded = false;
  paramsObject: any;

  constructor(private router:Router, private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
        console.log(this.paramsObject.params.code);
        this.fetchAccessToken(this.paramsObject.params.code);
      }
    );
  }

  fetchAccessToken(code: string) {
    //     POST /token HTTP/1.1
    // Host: oauth2.googleapis.com
    // Content-Type: application/x-www-form-urlencoded

    // code=4/P7q7W91a-oMsCeLvIaQm6bTrgtp7&
    // client_id=your_client_id&
    // client_secret=your_client_secret&
    // redirect_uri=https%3A//oauth2.example.com/code&
    // grant_type=authorization_code

    const params = {
      code: code,
      client_id: '959162043529-4l0a64ou7ninndoeu0mh2sqt6cgkk54r.apps.googleusercontent.com',
      client_secret: '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',
      redirect_uri: 'http://localhost:4200/auth',
      grant_type: 'authorization_code'
    }

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded'};

    this.httpClient.post<any>('https://oauth2.googleapis.com/token', { headers }, {params}).subscribe(data => {
      console.log(data);
      this.redirectToScreeningPage(data.access_token);
    });
    
  }

  redirectToScreeningPage(access_token: string) {
    this.router.navigate(['screening', access_token]);
  }

}

import { Member } from './../_models/member';
import { User } from '../_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseurl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getMembers() {
    return this.http.get<Member[]>(this.baseurl + "users");
  }
  getMember(username: string) {
    return this.http.get<Member>(this.baseurl + "users/" + username);
  }
}

import { Member } from './../_models/member';
import { User } from '../_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseurl = environment.apiUrl;
  members: Member[] = [];
  constructor(private http: HttpClient) { }
  getMembers() {
    if (this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseurl + "users").pipe(
      map((members) => {
        this.members = members;
        return this.members;
      })
    );
  }
  getMember(username: string) {
    const user = this.members.find(x => x.username === username);
    if (user!==undefined) return of(user);
    return this.http.get<Member>(this.baseurl + "users/" + username);
  }
  updateMember(member: Member) {
    return this.http.put(this.baseurl + "users", member).pipe(
      map(() => {
        var index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }
}

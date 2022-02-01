import { LikesParams } from './../_models/likesParams';
import { AccountService } from './account.service';
import { UserParams } from './../_models/userParams';
import { PaginatedResult } from './../_models/Pagination';
import { Member } from './../_models/member';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { find, map, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseurl = environment.apiUrl;
  members: Member[] = [];
  MemberCache = new Map()
  LikesCache = new Map()
  userParams: UserParams;
  likesParams: LikesParams;
  user: User;
  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
      this.likesParams = new LikesParams();
    })
  }


  setUserParams(userParams: UserParams) {
    this.userParams = userParams;
  }
  setLikesParams(likesParams: LikesParams) {
    this.likesParams = likesParams;
  }
  getLikesParams() {
    return this.likesParams;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }
  getUserParams() {
    return this.userParams;
  }
  getMembers(userParams: UserParams) {
    var response = this.MemberCache.get(Object.values(userParams).join('-'));
    if (response)
      return of(response);

    let params = this.getPaginationHeader(userParams.pageNumber, userParams.pageSize);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('minAge', userParams.minAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
    console.log("orderBy " + userParams.orderBy)
    return this.getPaginationResult<Member[]>(this.baseurl + "users", params)
      .pipe(map(response => {
        this.MemberCache.set(Object.values(userParams).join('-'), response);
        return response;
      }
      ))
  }

  getMember(username: string) {
    var member = [...this.MemberCache.values()]
      .reduce((arr, element) => arr.concat(element.result), []).find(member => member.username === username);
    if (member) {
      return of(member);
    }
    // const user = this.members.find(x => x.username === username);
    // if (user !== undefined) return of(user);
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

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseurl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseurl + 'users/delete-photo/' + photoId);
  }

  addLike(userName: string) {
    return this.http.post(this.baseurl + 'likes/' + userName, {});
  }
  getLikes(predicate: string) {
    var response = this.LikesCache.get(Object.values(this.likesParams).join('-'));
    if (response)
      return of(response);
    let params = this.getPaginationHeader(this.likesParams.pageNumber, this.likesParams.pageSize);
    params = params.append('predicate', predicate);
    return this.getPaginationResult<Partial<Member[]>>(this.baseurl + 'likes', params)
      .pipe(map(response => {
        this.LikesCache.set(Object.values(this.likesParams).join('-'), response);
        return response;
      }));
  }
  getPaginationResult<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getPaginationHeader(page: number, itemsPerPAge: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPAge);
    return params;
  }


}

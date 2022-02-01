import { Pagination } from './../_models/Pagination';
import { LikesParams } from './../_models/likesParams';
import { MemberService } from './../_services/member.service';
import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Partial<Member[]>;
  likesParams: LikesParams;
  pagination: Pagination;

  constructor(private memberService: MemberService) {
    this.likesParams = this.memberService.getLikesParams();
  }

  ngOnInit(): void {
    this.loadLikes();
  }


  loadLikes() {
    this.memberService.setLikesParams(this.likesParams);
    this.memberService.getLikes(this.likesParams.predicate).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }
  pageChanged(event: any) {
    console.log(event);
    this.likesParams.pageNumber = event.page;
    this.memberService.setLikesParams(this.likesParams);
    this.loadLikes();
  }

}

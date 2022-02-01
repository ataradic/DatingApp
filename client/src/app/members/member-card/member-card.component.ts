import { ToastrService } from 'ngx-toastr';
import { MemberService } from './../../_services/member.service';
import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input('member') member: Member;
  constructor(private memberService: MemberService, private toaster: ToastrService) { }

  ngOnInit(): void {
  }
  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe(() => {
      this.toaster.success("You have Liked " + member.knownAs);
    })
  }

}

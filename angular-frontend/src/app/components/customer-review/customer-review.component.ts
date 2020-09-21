import { Component, OnInit } from '@angular/core';
import { Roomranking, RoomrankingControllerService, Room, RoomControllerService } from 'build/openapi';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-review',
  templateUrl: './customer-review.component.html',
  styleUrls: ['./customer-review.component.css']
})
export class CustomerReviewComponent implements OnInit {
  rankings: Observable<Roomranking[]>;
  ranking: Roomranking = {
    comment : '',
    ranking : 0
  }
  roomId:number;
  constructor(private roomrankingService: RoomrankingControllerService,private roomService : RoomControllerService,private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.roomId = this.route.snapshot.params['id'];
    this.roomService.getRoomById(this.roomId).subscribe(room=> this.ranking.room =room)
    this.rankings = this.roomrankingService.getReviewsByRoomId(this.roomId);
  }

  onSubmit(){
    this.roomrankingService.createReview(this.ranking).subscribe(x => {this.rankings = this.roomrankingService.getReviewsByRoomId(this.roomId)})
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentRating } from 'src/app/models/comment-rating.model';
import { CommentRatingService } from 'src/app/services/comment-rating.service';
import { ServiceExecutionService } from 'src/app/services/service-execution.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  comment_ratings: CommentRating []
  commet_ratings_aux: CommentRating []
  service_code: number
  constructor( private service:CommentRatingService,
    private router: Router,
    private route: ActivatedRoute,
    private serviceExecutionService: ServiceExecutionService,
    private commentRatingService: CommentRatingService,
  ) { 
    this.comment_ratings = []
    
  }

  ngOnInit(): void {
    this.listCommentRatings();
  }

  listCommentRatings() {
    this.route.queryParams.subscribe(params =>{
      this.service_code = params['service_code'];
      if (this.service_code != null) {
        this.serviceExecutionService.view(this.service_code).subscribe(data => {
          this.comment_ratings = data["commentRatings"];
          console.log(JSON.stringify(this.comment_ratings));
        });
      } else {
        this.commentRatingService.list().subscribe(data => {
          this.comment_ratings = data
        })
      }
    })
  }

  create(){
    this.router.navigate(['comment_ratings/create/'])
  }

  view(id:number){
    this.router.navigate(['comment_ratings/view/'+id])
  }

  update(id:number){
    this.router.navigate(['comment_ratings/update/'+id])
  }

  delete(id: number){
    Swal.fire({
      title: 'Eliminar el pago',
      text: "Está seguro que quiere eliminar el pago",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, Cancelar'
      }).then((result) => {
      if (result.isConfirmed) {
      this.service.delete(id).
      subscribe(data => {
      Swal.fire(
      'Eliminado!',
      'El pago ha sido eliminado correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };

}
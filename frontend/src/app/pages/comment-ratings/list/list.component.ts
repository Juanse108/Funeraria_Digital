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
     private router:Router,
    private route: ActivatedRoute,
    private  serviceExecutionService: ServiceExecutionService,
  ) { 
    this.comment_ratings = []
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      let service_code = params['service_code'];
      this.list(service_code);
    })
  }

  list (service_code:number) {
    
    this.serviceExecutionService.view(service_code).subscribe(data=>{
      console.log(data);
      
      this.service_code = service_code;
      this.comment_ratings = data["commentRatings"];
      this.commet_ratings_aux = [];
  
      for(let commet_rating of this.comment_ratings){
        this.service.view(commet_rating.id).subscribe(data => {
          this.commet_ratings_aux.push(data);
        })
      }
  
      console.log(JSON.stringify(this.comment_ratings));
    });
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
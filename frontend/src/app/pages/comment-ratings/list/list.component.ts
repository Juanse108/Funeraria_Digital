import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommentRating } from 'src/app/models/comment-rating.model';
import { CommentRatingService } from 'src/app/services/comment-rating.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  comment_ratings: CommentRating []
  constructor( private service:CommentRatingService, private router:Router) { 
    this.comment_ratings = []
  }

  ngOnInit(): void {
    this.list()
  }

  list () {
    this.service.list().subscribe( data =>{
      this.comment_ratings = data
      console.log(JSON.stringify(this.comment_ratings));
      
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
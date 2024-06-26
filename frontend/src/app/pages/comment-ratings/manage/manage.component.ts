import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentRating } from 'src/app/models/comment-rating.model';
import { ServiceExecution } from 'src/app/models/service-execution.model';
import { CommentRatingService } from 'src/app/services/comment-rating.service';
import { ServiceExecutionService } from 'src/app/services/service-execution.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number
  comment_rating: CommentRating
  theFormGroup: FormGroup
  trySend: boolean
  serviceExecutions: ServiceExecution []
  constructor(private activateRoute: ActivatedRoute,
    private service: CommentRatingService,
    private serviceExecutionService: ServiceExecutionService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.serviceExecutions = []
    this.comment_rating = { id: 0,service_code: 0, rating: 0, comment: "" }
  }

  ngOnInit(): void {
    this.servicesList()
    this.configFormGroup()
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }

    if (this.activateRoute.snapshot.params.id) {
      this.comment_rating.id = this.activateRoute.snapshot.params.id;
      this.getEjecution(this.comment_rating.id);
    }
  }
  getEjecution(id: number) {
    this.service.view(id).subscribe(data => {
      this.comment_rating = data
    })
  }

  servicesList() {
    this.serviceExecutionService.list().subscribe(data => {
      this.serviceExecutions = data
    })
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id:[],
      service_code: ['', [
        Validators.required
      ]],
      rating: ['', [
        Validators.min(1),
        Validators.max(5)
      ]],
      comment: ['', [
        Validators.maxLength(300)
      ]]
    });
  }

  get getFormGroup() {
    return this.theFormGroup.controls
  }

  create() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      
      
      this.service.create(this.comment_rating).subscribe(data => {   
        Swal.fire('Completado', 'Se ha creado Correctamente', 'success')
        this.router.navigate(['comment_ratings/list'])
      })
    }
  }

  update() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.service.update(this.comment_rating).subscribe(data => {
        Swal.fire('Completado', 'Se ha creado Correctamente', 'success')
        this.router.navigate(['comment_ratings/list'])
      })
    }
  }
}

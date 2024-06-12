import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Type } from 'src/app/models/type.model';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  types: Type []
  constructor( private service:TypeService, private router:Router) { 
    this.types = []
  }

  ngOnInit(): void {
    this.list()
  }

  list () {
    this.service.list().subscribe( data =>{
      this.types = data
      console.log(JSON.stringify(this.types));
      
    })
  }

  create(){
    this.router.navigate(['tipos_musica/create/'])
  }
}

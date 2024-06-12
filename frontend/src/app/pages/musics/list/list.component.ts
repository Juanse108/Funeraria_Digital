import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Music } from 'src/app/models/music.model';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  musics: Music []
  constructor( private service:MusicService, private router:Router) { 
    this.musics = []
  }

  ngOnInit(): void {
    this.list()
  }

  list () {
    this.service.list().subscribe( data =>{
      this.musics = data
      console.log(JSON.stringify(this.musics));
      
    })
  }

  create(){
    this.router.navigate(['servicios_musicales/create/'])
  }
  
}

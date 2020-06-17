import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../intefaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[]= [];
  
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){
    this.cargarNoticias();
  }

  loadData(event){
    console.log(event)
    this.cargarNoticias(event);
  }

  cargarNoticias(event?){
    this.noticiasService.getTopHeadlines().subscribe(result => {
      console.log('Noticias: ',result);
      if(result.articles.length === 0){
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      this.noticias.push(...result.articles);
      if(event && result.articles.length > 0){
        event.target.complete();
      }
    })
  }

}

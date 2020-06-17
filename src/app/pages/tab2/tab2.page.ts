import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../intefaces/interfaces';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, {static: true}) segment: IonSegment;

  categorias = [
    {name: 'business', title: 'negocios'},
    {name: 'entertainment', title: 'entretenimiento'},
    {name: 'general', title: 'general'},
    {name: 'health', title: 'salud'},
    {name: 'science', title: 'ciencia'},
    {name: 'sports', title: 'deportes'},
    {name: 'technology', title: 'tecnología'}
  ];
  noticias: Article[]= [];
  
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){
    this.segment.value = this.categorias[0].name;
    this.cargarNoticias(this.categorias[0].name); 
  }

  cambioCategoria(event){
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(categoria: string, event?){
    this.noticiasService.getTopHeadlinesCategory(categoria).subscribe(result => {
      this.noticias.push(...result.articles);
      if(event){
        event.target.complete();
      }
    })
  }

  loadData(event){
    this.cargarNoticias(this.segment.value, event);
  }

}

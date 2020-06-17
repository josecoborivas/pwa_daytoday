import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../intefaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() index: number;
  @Input() enFavoritos;


  constructor(
    private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService,
    private toastCtrl: ToastController) { }

  ngOnInit() {}

  async agregarFavoritoToast() {
    const toast = await this.toastCtrl.create({
      message: 'Se agregó a tus favoritos!',
      color: 'success',
      duration: 2000
    });
    toast.present();
  }

  async borrarFavoritoToast() {
    const toast = await this.toastCtrl.create({
      message: 'Se eliminó de tus favoritos!',
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }

  abrirNoticia(){
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu(){
    let borrarFavoritoBtn;
    if(this.enFavoritos) {
      borrarFavoritoBtn = {
        text: 'Borrar de favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.dataLocalService.borrarFavorito(this.noticia);
          this.borrarFavoritoToast();
        }
      }
    } else {
      borrarFavoritoBtn =  {
        text: 'Favoritos',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.dataLocalService.guardarNoticia(this.noticia);
          this.agregarFavoritoToast();
        }
      }
    }
    const actionSheet = await this.actionSheetCtrl.create({
      cssClass: 'my-custom-class',
      buttons: [
      {
        text: 'Compartir',
        icon: 'share-social-outline',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      }, 
      borrarFavoritoBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}

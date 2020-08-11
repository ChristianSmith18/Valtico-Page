import { Component, OnInit } from '@angular/core';

import Compressor from 'compressorjs';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  public clients = new Array(5);
  public currentIndex: number = null;
  public currenImg: string = null;

  constructor() {}

  ngOnInit(): void {}

  changeImg(index: number) {
    if (index === this.currentIndex) {
      (document.querySelector('#tempImg') as HTMLInputElement).click();
    }
  }

  editar(index: number) {
    this.currentIndex = index;
    this.currenImg = document.querySelectorAll('img')[
      this.currentIndex + 1
    ].src;
  }

  guardar(index: number) {
    const li = document.querySelectorAll('ul[uk-accordion] > li')[index];
    li.querySelectorAll('[contenteditable]').forEach((content) => {
      console.log(content.innerHTML);
    });
    console.log(this.currenImg);
    this.currentIndex = null;
    this.currenImg = null;
  }

  eliminar(index: number) {
    const li = document.querySelectorAll('ul[uk-accordion] > li')[index];
    li.remove();
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0] || null;

    if (file) {
      if (
        file.type !== 'image/png' &&
        file.type !== 'image/jpg' &&
        file.type !== 'image/jpeg'
      ) {
        (evt.target as HTMLInputElement).value = '';
        return;
      }
      const reader = new FileReader();
      const compFile = new Compressor(file, {
        quality: 0.6,
        success: (result) => {
          reader.readAsDataURL(result);

          reader.onloadend = () => {
            const base64data = reader.result.toString();

            document.querySelectorAll('img')[
              this.currentIndex + 1
            ].src = base64data;

            this.currenImg = base64data;
          };
        },
      });
    } else {
      (evt.target as HTMLInputElement).value = '';
    }
  }
}

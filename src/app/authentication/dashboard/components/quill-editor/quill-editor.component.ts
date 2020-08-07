import { Component, OnInit } from '@angular/core';
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module';
import { ImageDrop } from 'quill-image-drop-module';

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss'],
})
export class QuillEditorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const quill = new Quill('#editor', {
      theme: 'snow',
      placeholder: 'Escriba aquí el contenido...',
      modules: {
        toolbar: '#toolbar',
        imageResize: {},
        imageDrop: true,
      },
    });
  }
}

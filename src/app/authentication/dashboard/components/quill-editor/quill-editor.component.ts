import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() innerHTML = new EventEmitter<any>();
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

    quill.on('text-change', () => {
      this.changeContent();
    });
  }

  changeContent() {
    this.innerHTML.emit(document.querySelector('#editor > .ql-editor'));
  }
}

import { Component, OnInit } from '@angular/core';
import { Cliente } from '@shared/models/cliente.interface';
import { ClientesService } from '@shared/services/clientes.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'page-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  public clients: Cliente[];
  public loader = false;

  constructor(private _clientes: ClientesService) {
    this._clientes.getClientes(false).subscribe(({ clientes }) => {
      this.clients = clientes;
      this.loader = true;
    });
  }

  ngOnInit(): void {}
}

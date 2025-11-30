import { Component, OnInit } from '@angular/core';
import { IncidenciaDataService } from '../service/data/incidencia-data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export class Incidencia {
  constructor(
    public id: number,
    public titulo: string,
    public descripcion: string,
    public estado: string,
    public prioridad: string,
    public fechaCreacion: Date,
    public fechaCierre: Date,
    public customerId: number
  ) { }
}

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit {

  incidencias: Incidencia[];
  message: string;

  constructor(
    private service: IncidenciaDataService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.retrieveAllIncidencias();
  }

  retrieveAllIncidencias() {
    this.service.retrieveAllIncidencias('houarizegai').subscribe(
      response => {
        this.incidencias = response;
      }
    );
  }

  addIncidencia() {
    this.router.navigate(['incidencias', -1]);
  }

  updateIncidencia(id) {
    this.router.navigate(['incidencias', id]);
  }

  deleteIncidencia(id) {
    this.service.deleteIncidencia('houarizegai', id).subscribe(
      response => {
        this.toastr.success('Success', 'The incident has been deleted!', {
          timeOut: 3000
        });
        this.retrieveAllIncidencias();
      }
    );
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Abierta': return 'badge badge-danger';
      case 'En Progreso': return 'badge badge-warning';
      case 'Cerrada': return 'badge badge-success';
      default: return 'badge badge-secondary';
    }
  }

  getPrioridadClass(prioridad: string): string {
    switch (prioridad) {
      case 'Alta': return 'text-danger font-weight-bold';
      case 'Media': return 'text-warning font-weight-bold';
      case 'Baja': return 'text-success';
      default: return '';
    }
  }
}

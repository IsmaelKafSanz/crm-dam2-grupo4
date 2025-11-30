import { Component, OnInit } from '@angular/core';
import { IncidenciasService } from '../../services/incidencias.service';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit {

  incidencias: any[] = [];

  constructor(private incidenciasService: IncidenciasService) {}

  ngOnInit(): void {
    this.cargarIncidencias();
  }

  cargarIncidencias() {
    this.incidenciasService.getIncidencias().subscribe(data => {
      this.incidencias = data;
    });
  }
}


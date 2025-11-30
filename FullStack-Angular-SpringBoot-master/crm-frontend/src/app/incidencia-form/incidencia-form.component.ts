import { Component, OnInit } from '@angular/core';
import { Incidencia } from '../incidencias/incidencias.component';
import { IncidenciaDataService } from '../service/data/incidencia-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-incidencia-form',
  templateUrl: './incidencia-form.component.html',
  styleUrls: ['./incidencia-form.component.css']
})
export class IncidenciaFormComponent implements OnInit {

  incidencia: Incidencia;
  id: number;

  estados = ['Abierta', 'En Progreso', 'Cerrada'];
  prioridades = ['Baja', 'Media', 'Alta'];

  constructor(
    private service: IncidenciaDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.params.id);

    const incidenciaId = this.id === -1 ? null : this.id;
    this.incidencia = new Incidencia(incidenciaId, '', '', 'Abierta', 'Media', null, null, null);

    if (this.id !== -1) {
      this.service.retrieveIncidencia('houarizegai', this.id).subscribe(
        response => this.incidencia = response
      );
    }
  }

  onSave() {
    console.log('=== SAVING INCIDENCIA ===');
    console.log('Route ID:', this.id);
    console.log('Incidencia before save:', this.incidencia);

    if (this.id === -1) {
      console.log('>>> Creating NEW incidencia (POST)');

      const newIncidencia = {
        titulo: this.incidencia.titulo,
        descripcion: this.incidencia.descripcion,
        estado: this.incidencia.estado,
        prioridad: this.incidencia.prioridad,
        customerId: this.incidencia.customerId
      };

      console.log('New incidencia object to send:', newIncidencia);

      this.service.addIncidencia('houarizegai', newIncidencia as Incidencia).subscribe(
        response => {
          console.log('✅ Incidencia created successfully:', response);
          this.router.navigate(['incidencias']);
        },
        error => {
          console.error('❌ Error creating incidencia:', error);
          console.error('Error details:', error.error);
          console.error('Status:', error.status);
        }
      );
    } else {
      console.log('>>> Updating EXISTING incidencia (PUT)');
      this.service.updateIncidencia('houarizegai', this.incidencia).subscribe(
        response => {
          console.log('✅ Incidencia updated successfully:', response);
          this.router.navigate(['incidencias']);
        },
        error => {
          console.error('❌ Error updating incidencia:', error);
        }
      );
    }
  }
}

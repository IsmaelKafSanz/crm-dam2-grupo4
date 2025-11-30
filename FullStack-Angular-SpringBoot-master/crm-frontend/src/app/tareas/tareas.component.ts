import { Component, OnInit } from '@angular/core';
import { TareaDataService } from '../service/data/tarea-data.service';
import { ToastrService } from 'ngx-toastr';

export class Tarea {
  constructor(
    public id: number,
    public titulo: string,
    public descripcion: string,
    public estado: string,
    public prioridad: string,
    public fechaCreacion: Date,
    public fechaLimite: Date,
    public asignadoA: string
  ) { }
}

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  tareasPendientes: Tarea[] = [];
  tareasEnCurso: Tarea[] = [];
  tareasCompletadas: Tarea[] = [];

  showNewTaskForm: boolean = false;
  nuevaTarea: Tarea = this.crearTareaVacia();

  constructor(
    private service: TareaDataService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadTareas();
  }

  loadTareas() {
    this.service.retrieveAllTareas('houarizegai').subscribe(
      response => {
        // Separar tareas por estado
        this.tareasPendientes = response.filter(t => t.estado === 'PENDIENTE');
        this.tareasEnCurso = response.filter(t => t.estado === 'EN_CURSO');
        this.tareasCompletadas = response.filter(t => t.estado === 'COMPLETADA');
      }
    );
  }

  crearTareaVacia(): Tarea {
    return new Tarea(null, '', '', 'PENDIENTE', 'Media', null, null, '');
  }

  toggleNewTaskForm() {
    this.showNewTaskForm = !this.showNewTaskForm;
    if (this.showNewTaskForm) {
      this.nuevaTarea = this.crearTareaVacia();
    }
  }

  guardarNuevaTarea() {
    if (!this.nuevaTarea.titulo || this.nuevaTarea.titulo.trim() === '') {
      this.toastr.error('Task title is required!', 'Error');
      return;
    }

    this.service.addTarea('houarizegai', this.nuevaTarea).subscribe(
      response => {
        this.toastr.success('Task created successfully!', 'Success', {
          timeOut: 2000
        });
        this.showNewTaskForm = false;
        this.loadTareas();
      },
      error => {
        this.toastr.error('Error creating task', 'Error');
      }
    );
  }

  cancelarNuevaTarea() {
    this.showNewTaskForm = false;
    this.nuevaTarea = this.crearTareaVacia();
  }

  getPrioridadClass(prioridad: string): string {
    switch (prioridad) {
      case 'Alta': return 'prioridad-alta';
      case 'Media': return 'prioridad-media';
      case 'Baja': return 'prioridad-baja';
      default: return '';
    }
  }

  moverTarea(tarea: Tarea, nuevoEstado: string) {
    const estadoAnterior = tarea.estado;
    tarea.estado = nuevoEstado;

    this.service.updateTarea('houarizegai', tarea).subscribe(
      response => {
        this.toastr.success('Task moved successfully!', 'Success', {
          timeOut: 2000
        });
        this.loadTareas(); // Recargar para actualizar las columnas
      },
      error => {
        tarea.estado = estadoAnterior; // Revertir en caso de error
        this.toastr.error('Error moving task', 'Error');
      }
    );
  }

  deleteTarea(id: number) {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      this.service.deleteTarea('houarizegai', id).subscribe(
        response => {
          this.toastr.success('Task deleted!', 'Success', {
            timeOut: 2000
          });
          this.loadTareas();
        }
      );
    }
  }

  getTareasPorEstado(estado: string): Tarea[] {
    switch (estado) {
      case 'PENDIENTE': return this.tareasPendientes;
      case 'EN_CURSO': return this.tareasEnCurso;
      case 'COMPLETADA': return this.tareasCompletadas;
      default: return [];
    }
  }
}

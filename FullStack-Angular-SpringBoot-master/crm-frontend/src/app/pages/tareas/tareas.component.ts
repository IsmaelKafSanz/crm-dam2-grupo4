import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html'
})
export class TareasComponent implements OnInit {

  tareas: any[] = [];
  tareaForm!: FormGroup;

  editando = false;
  idEditando: number | null = null;

  constructor(private fb: FormBuilder, private tareasService: TareasService) {}

  ngOnInit(): void {
    this.tareaForm = this.fb.group({
      titulo: ['', Validators.required],
      prioridad: ['', Validators.required],
      fecha: ['', Validators.required]
    });

    this.cargarTareas();
  }

  cargarTareas() {
    this.tareasService.getTareas().subscribe(data => {
      this.tareas = data;
    });
  }

  guardar() {
    if (!this.editando) {
      this.tareasService.createTarea(this.tareaForm.value).subscribe(() => {
        this.cargarTareas();
        this.tareaForm.reset();
      });
    } else {
      this.tareasService.updateTarea(this.idEditando!, this.tareaForm.value).subscribe(() => {
        this.cargarTareas();
        this.cancelarEdicion();
      });
    }
  }

  editar(t: any) {
    this.editando = true;
    this.idEditando = t.id;
    this.tareaForm.patchValue(t);
  }

  eliminar(id: number) {
    this.tareasService.deleteTarea(id).subscribe(() => {
      this.cargarTareas();
    });
  }

  cancelarEdicion() {
    this.editando = false;
    this.idEditando = null;
    this.tareaForm.reset();
  }
}



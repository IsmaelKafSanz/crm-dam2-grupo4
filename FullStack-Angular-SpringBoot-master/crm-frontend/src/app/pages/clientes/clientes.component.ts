import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit, AfterViewInit {

  clienteForm!: FormGroup;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['nombre', 'email', 'telefono', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required]
    });

    this.cargarClientes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarClientes(): void {
    this.clientesService.getClientes().subscribe(data => {
      this.dataSource.data = data;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  guardarCliente() {
    if (this.clienteForm.valid) {
      this.clientesService.createCliente(this.clienteForm.value).subscribe(() => {
        this.cargarClientes();
        this.clienteForm.reset();
      });
    }
  }
}

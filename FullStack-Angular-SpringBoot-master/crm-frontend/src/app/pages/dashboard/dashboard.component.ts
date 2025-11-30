import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { ClientesService } from '../../services/clientes.service';
import { IncidenciasService } from '../../services/incidencias.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Ejemplo: gráfico de barras de incidencias por estado
  public barChartLabels: Label[] = ['Pendiente', 'En proceso', 'Resuelta'];
  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0], label: 'Incidencias' }
  ];
  public barChartOptions: ChartOptions = { responsive: true };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  // Pie para proporción de clientes por tipo (ejemplo)
  public pieChartLabels: Label[] = ['Tipo A', 'Tipo B', 'Tipo C'];
  public pieChartData: SingleDataSet = [0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  constructor(private incService: IncidenciasService, private cliService: ClientesService) {}

  ngOnInit(): void {
    this.loadIncidenciasStats();
    this.loadClientesStats();
  }

  loadIncidenciasStats() {
    this.incService.getIncidencias().subscribe(list => {
      const pend = list.filter((i:any) => i.estado === 'Pendiente').length;
      const proc = list.filter((i:any) => i.estado === 'En proceso').length;
      const res = list.filter((i:any) => i.estado === 'Resuelta').length;

      this.barChartLabels = ['Pendiente', 'En proceso', 'Resuelta'];
      this.barChartData = [{ data: [pend, proc, res], label: 'Incidencias' }];
    });
  }

  loadClientesStats() {
    this.cliService.getClientes().subscribe(list => {
      // ejemplo simple: dividir aleatoriamente por "tipos" si no existe tipo en BD
      const a = Math.round(list.length * 0.5);
      const b = Math.round(list.length * 0.3);
      const c = list.length - a - b;
      this.pieChartLabels = ['Tipo A', 'Tipo B', 'Tipo C'];
      this.pieChartData = [a, b, c];
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit{
  visits: any[] = [];

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idClass = params['idClass'];

      this.api.getAllVisits(idClass).subscribe(
      (response) => {
        this.visits = response.aulas; // Assuming that your response has a structure like { aulas: [...] }
      },
      (error) => {
        console.log('visits.component.ts - Erro:', error);
      }
    )
    });
  }
}

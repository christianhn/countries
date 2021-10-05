import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";

import { Country } from '../../interfaces/paises.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country[];

  constructor( 
    private activateRoute: ActivatedRoute,
    private paisService: PaisService 
    
    ) { }

  ngOnInit(): void {
    this.activateRoute.params
      .subscribe( ({id}) => {
        console.log(id);

        this.paisService.getPaisPorAlpha( id )
          .subscribe( pais => {
            console.log(pais[0]);
          })
      } );

    this.activateRoute.params
    .pipe( 
      switchMap( ( params ) =>this.paisService.getPaisPorAlpha( params.id ) )
     )
    .subscribe( pais => this.pais = pais )

  }

}

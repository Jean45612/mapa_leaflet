import { NgModule } from '@angular/core';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    NgMaterialMultilevelMenuModule,
    MatSidenavModule,
    ReactiveFormsModule
  ],
  exports: [
    NgMaterialMultilevelMenuModule,
    MatSidenavModule,
    ReactiveFormsModule
  ]
})

export class LibreriasModule { }

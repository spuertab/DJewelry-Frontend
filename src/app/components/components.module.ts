import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';

import { FactoryComponent } from './factory/factory.component';
import { TypographyComponent } from './typography/typography.component';
import { LabComponent } from './lab/lab.component';
import { ComponentsComponent } from './components.component';

@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JWBootstrapSwitchModule
      ],
    declarations: [ 
        FactoryComponent,
        ComponentsComponent,
        TypographyComponent,
        LabComponent
    ],
    exports:[ ComponentsComponent ]
})
export class ComponentsModule { }
 
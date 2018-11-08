import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { FactoryComponent } from './components/factory/factory.component';
import { TypographyComponent } from './components/typography/typography.component';
import { LabComponent } from './components/lab/lab.component';

const routes: Routes =[
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index',                component: ComponentsComponent },
    { path: 'lab/:lab',          component: LabComponent },
    { path: 'factory',              component: FactoryComponent },
    { path: 'form',              component: TypographyComponent },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }

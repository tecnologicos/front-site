import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { UsersService } from './users/users.service';
import { FiltroUsuarioPipe } from './users/filtro-usuario.pipe';
import { RedimensionarDirective } from './redimensionar.directive';
import { FormatadorDataPipe } from './formatador-data.pipe';
import { DadosService } from './dados.service';
import { PainelComponent } from './painel/painel.component';
import { ZerosPipe } from './zeros.pipe';
import { MenuComponent } from './menu/menu.component';

const appRoutes: Routes = [
    { path: 'painel', component: PainelComponent },
    { path: 'users', component: UsersComponent },
    /*{ path: '',
      redirectTo: '/',
      pathMatch: 'full'
    },*/
    { path: '**', component: HomeComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		UsersComponent,
		FiltroUsuarioPipe,
		RedimensionarDirective,
		FormatadorDataPipe,
		PainelComponent,
		ZerosPipe,
		MenuComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(
            appRoutes
            //{ enableTracing: true } // <-- debugging purposes only
        ),
        BrowserAnimationsModule,
	],
	providers: [
        DadosService,
		UsersService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

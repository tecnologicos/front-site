import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent {
	title = 'tech-front';

	appName:string;
	permissao:string;
	usuarioHackAdmin:boolean;
	username:string;
	isLogado:boolean;

	ngOnInit() {
		var divHiddens = (<HTMLDivElement>document.getElementById('hiddens'));
		var hAppName = (<HTMLInputElement>document.getElementById('hidden-app-name'));
		var hPermissao = (<HTMLInputElement>document.getElementById('hidden-permissao'));
		var hUsuarioHackAdmin = (<HTMLInputElement>document.getElementById('hidden-usuario-hack-admin'));
		var hUsername = (<HTMLInputElement>document.getElementById('hidden-username'));
		var hIsLogado  = (<HTMLInputElement>document.getElementById('hidden-is-logado'));

		this.appName = hAppName ? hAppName.value : null;
		this.permissao = hPermissao ? hPermissao.value : null;
		this.usuarioHackAdmin = hUsuarioHackAdmin ? hUsuarioHackAdmin.value == "1" : false;
		this.username = hUsername ? hUsername.value : null;
		this.isLogado = hIsLogado ? hIsLogado.value == "1" : false;
		//divHiddens.remove();
	}
}

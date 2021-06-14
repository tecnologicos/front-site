import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '../abstract-component';
import { User } from '../users/user';
import { UsersService } from '../users/users.service';
declare var jQuery: any;

@Component({
	selector: 'app-painel',
	templateUrl: './painel.component.html',
	styleUrls: ['./painel.component.less']
})
export class PainelComponent extends AbstractComponent implements OnInit {

	constructor(private usuarioService: UsersService) {
		super();
	}

	usuario: User = User.generate();

	editandoFlag = false;

	editarUsuario() {
		this.editavel = false;
		this.usuarioService.editarUsuario(this.usuario)
			.then(user => {
				this.editandoFlag = false;
				this.editavel = true;
				this.usuario = user;
				this.aviso = "Usuário Atualizado!"
				this.erroAviso = false;
			})
			.catch(response => {
				alert(this.erroHttp(response));
				this.editavel = true;
			});
	}

	redefinirSenha() {
		if (this.usuario.password == null || this.usuario.password_confirmation == null) {
			alert ("Uma senha deve ser informada!");
			return;
		}
		if (this.usuario.password != this.usuario.password_confirmation) {
			alert("Senhas não Conferem!");
			return;
		}

		this.editavel = false;
		this.usuarioService.redefinirSenha(this.usuario)
			.then(response => {
				jQuery('#dialogResetSenha').modal('hide');
				this.editavel = true;
				alert("Senha Alterada!");
			})
			.catch(response => {
				alert(this.erroHttp(response));
				this.editavel = true;
			});
	}

	ngOnInit() {
		this.usuarioService.usuarioLogado()
			.then(user => {
				this.usuario = user;
				this.status = this.COMPLETE;
				this.editavel = true;
			})
			.catch(response => {
				this.status = this.ERROR;
				this.aviso = this.erroHttp(response);
				alert(this.erroHttp(response))
				this.erroAviso = true;
				console.log(response)
			})
	}

}

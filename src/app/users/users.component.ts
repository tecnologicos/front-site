import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './user';
import { AbstractComponent } from '../abstract-component';
declare var jQuery: any;

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.less']
})
export class UsersComponent extends AbstractComponent implements OnInit {

	criteria: string = "";

	usuarioTemp: User = User.generate();
	setPermissaoFlag = false;

	constructor(private usuarioService: UsersService) {
		super();
	}

	get usuarios(): Array<User> {
		return this.usuarioService.usuarios;
	}

	set usuarios(usuarios: Array<User>) {
		this.usuarioService.usuarios = usuarios;
	}

	alterarPermissao() {
		this.usuarioService.alteraPermissao(this.usuarioTemp)
			.then(response => {
				if (response)
					alert(this.erroHttp(response));
				else {
					this.resetEdit();
				}
				this.setPermissaoFlag = false;
			})
			.catch(response => {
				alert(this.erroHttp(response));
				this.setPermissaoFlag = false;
			});
	}

	habilitarEdicaoPermissao(usuario: User) {
		this.usuarioTemp = usuario.clone();
		this.setPermissaoFlag = true;
		setTimeout(function () {
			document.getElementById('selectPermissao').focus();
		}, 300);
	}

	resetEdit() {
		this.usuarioTemp = User.generate();
	}

	novoUsuario() {
		this.editavel = false;
		this.usuarioService.novoUsuario(this.usuarioTemp)
			.then(response => {
				jQuery('#dialogNovoUsuario').modal('hide');
				this.editavel = true;
			})
			.catch(response => {
				alert(this.erroHttp(response));
				this.editavel = true;
			});
	}

	selecionarUsuario(user: User) {
		this.usuarioTemp = user.clone();
		this.setPermissaoFlag = false;
	}

	editarUsuario() {
		this.editavel = false;
		this.usuarioService.editarUsuario(this.usuarioTemp)
			.then(response => {
				jQuery('#dialogEditarUsuario').modal('hide');
				this.editavel = true;
			})
			.catch(response => {
				alert(this.erroHttp(response));
				this.editavel = true;
			});
	}

	redefinirSenha() {
		if (this.usuarioTemp.password == null || this.usuarioTemp.password_confirmation == null) {
			alert ("Uma senha deve ser informada!");
			return;
		}
		if (this.usuarioTemp.password != this.usuarioTemp.password_confirmation) {
			alert("Senhas não Conferem!");
			return;
		}

		this.editavel = false;
		this.usuarioService.redefinirSenha(this.usuarioTemp)
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

	submeterLogarComo(uid) {
        document.forms["form-logar-como-" + uid].submit();
        //$('meta[name="csrf-token"]').attr('content')
    }

	ngOnInit() {
		this.resetEdit();

		this.usuarioService.listaUsuarios()
			.then(response => {
				this.status = this.COMPLETE;
				this.editavel = true;
			})
			.catch(response => {
				this.status = this.ERROR;
				console.log(response)
			})
		
	}

}

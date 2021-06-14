import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user';

@Pipe({
	name: 'filtroUsuario'
})
export class FiltroUsuarioPipe implements PipeTransform {

	transform(value: Array<User>, criteria: string): Array<User> {
		if (criteria == "")
			return value;

		var usuarios: Array<User> = [];

		for (var i in value) {
			if (this.filtro(value[i], criteria.toUpperCase()))
				usuarios.push(value[i])
		}
		return usuarios;
	}

	filtro(usuario: User, criteria: string): boolean {
		if (usuario.name.toUpperCase().search(criteria) >= 0 ||
			usuario.email.toUpperCase().search(criteria) >= 0 ||
			usuario.permissao.startsWith(criteria))
			return true;


		return false;
	}


}

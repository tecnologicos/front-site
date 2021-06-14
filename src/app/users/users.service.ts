import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ArrayIndexador } from '../array-indexador';
import { User } from './user';

@Injectable()
export class UsersService {

    usuarios: Array<User>;
    usuariosIndex: ArrayIndexador<User> = null;

    constructor(private http: Http) {
    }

    async listaUsuarios(): Promise<Array<User>> {
        const response = await this.http.get('users/lista')
            .toPromise();
        this.usuarios = User.generateList(response.json());
        this.usuariosIndex = new ArrayIndexador<User> (this.usuarios);
        return this.usuarios;
    }

    novoUsuario (usuario : User) {
        return this.http.post('users', usuario).toPromise()
            .then(response => {
                this.usuarios = User.generateList(response.json());
                this.usuariosIndex = new ArrayIndexador<User> (this.usuarios);
                return this.usuarios;
            })
    }

    editarUsuario (usuario : User) {
        return this.http.put('users/'+ usuario.id, usuario).toPromise()
            .then(response => {
                var u = new User(response.json());
                if (this.usuariosIndex != null)
                    this.usuariosIndex.get(u.id).aply(u);
                return u;
            })
    }

    redefinirSenha (usuario : User) {
        return this.http.put('users/password/'+ usuario.id, usuario).toPromise()
            .then(response => {
                var u = new User(response.json());
                if (this.usuariosIndex != null)
                    this.usuariosIndex.get(u.id).aply(u);
                return u;
            })
    }

    alteraPermissao(usuario: User): Promise<User> {
        return this.http.put("users/permissao/" + usuario.id, usuario).toPromise()
            .then(response => {
                var u = new User(response.json());
                /*for (var i in this.usuarios) {
                    if (this.usuarios[i].id == u.id)
                        this.usuarios[i].permissao = u.permissao;
                }*/
                if (this.usuariosIndex != null)
                this.usuariosIndex.get(u.id).aply(u);
                return null;
            })
            .catch(response => {
                return response;
            })
    }

    usuarioLogado(): Promise<User> {
        return this.http.get("/logado") .toPromise()
            .then (response => {
                var u = new User(response.json())
                return u;
            }); 
    }
}
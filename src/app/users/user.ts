export class User {
    
	id:number;
    name:string;
    login:string;
    email:string;
    permissao:string;

    password;
    password_confirmation;

    constructor (id:number|object,name?:string,email?:string,login?:string,permissao?:string) {
        if (typeof id == 'number') {
            this.id = id;
            this.name = name;
            this.login = login;
            this.email = email;
            this.permissao = permissao;
        }
        else {
            this.id = parseInt(id['id']);
            this.name = id['name'];
            this.login = id['login'];
            this.email = id['email'];
            this.permissao = id['permissao'];
        }
    }

    public static generateList (list:Array<any>):Array<User> {
        var usuarioList: Array<User> = [];
        list.forEach(usuarioAny => {
            var usuario = new User(usuarioAny)
            usuarioList.push(usuario);
        });
        return usuarioList;
    };

    public static generate() {
        return new User(0,"","","","");
    }

    public aply(user: User) {
        this.id = user.id;
        this.name =  user.name;
        this.login =  user.login;
        this.email =  user.email;
        this.permissao =  user.permissao;
    }

    public clone ():User {
        return new User (this);
    }
}
export abstract class AbstractComponent {

    editavel: boolean = false;

    readonly LOADING = 0;
    readonly COMPLETE = 1;
    readonly ERROR = 2;
    status: number = this.LOADING;

    aviso:string = "";
    erroAviso:boolean;

    constructor() { }

    protected erroHttp (response):string {
        var mensagem:string;
        if (response.status == 0) {
            mensagem = "Falha na Conexão!";
        }
        else {
            try {
                mensagem = response.json().message;
            }
            catch (e) {
                if (response.message)
                    mensagem = response.message;
                else 
                    mensagem = response;
            }
            
        }
        return mensagem;
    }
}
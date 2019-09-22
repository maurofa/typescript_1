import { Negociacoes, Negociacao, NegociacaoParcial } from "../models/index";
import { NegociacoesView, MensagemView } from "../views/index";
import { domInject, throttle } from "../helpers/decorators/index";
import { NegociacaoService, ResponseHandler } from "../services/index";
import { imprime } from "../helpers/index";
// import { logarTempoDeExecucao } from "../helpers/decorators/index";


export class NegociacaoController {

    @domInject('data')
    private _inputData: JQuery;
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    @domInject('#valor')
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView("#mensagemView");
    private _service = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negociacoes.paraArray());
    }

    // @logarTempoDeExecucao(true)
    @throttle()
    adiciona(event: Event) : void{

        const negociacao = new Negociacao(
            new Date(this._inputData.val().replace(/-/g, ',')),
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );
        this._negociacoes.adiciona(negociacao);
        imprime(negociacao, this._negociacoes);
        this._mensagemView.update("Negociação adicionada com sucesso!");
        this._negociacoesView.update(this._negociacoes.paraArray());

        // console.log(this._negociacoes, event);
    }

    @throttle()
    async importarDados() {

        const isOk: ResponseHandler = (res: Response) => {
            if(res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        }

        try {

            const negociacoes  = await this._service.obterNegociacoes(isOk);
    
            const jaImportadas = this._negociacoes.paraArray();
            if(negociacoes) {
                negociacoes
                    .filter(negociacao => !jaImportadas.some(jaImportada => jaImportada.ehIgual(negociacao)))
                    .forEach(negociacao => this._negociacoes.adiciona(negociacao));
                this._negociacoesView.update(this._negociacoes.paraArray());
            }

        }catch(err) {
            this._mensagemView.update(err.message);
        }

    }
}
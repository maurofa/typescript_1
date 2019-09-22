import { Negociacao } from "./Negociacao";
import { Imprimivel } from "./Imprimivel";
import { Igualavel } from "./Igualavel";

export class Negociacoes implements Imprimivel, Igualavel<Negociacoes> {
    private _negociacoes : Negociacao[] = [];

    adiciona(negociacao : Negociacao): void {
        this._negociacoes.push(negociacao);
    }

    paraArray(): Negociacao[] {
        return [].concat(this._negociacoes);
    }

    paraTexto(): void {

        console.log('-- paraTexto --');
        console.log(JSON.stringify(this._negociacoes));
    }

    ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(negociacoes).includes(JSON.stringify(this._negociacoes));
    }
}
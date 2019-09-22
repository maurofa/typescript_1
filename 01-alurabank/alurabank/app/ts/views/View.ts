// import { logarTempoDeExecucao } from "../helpers/decorators/index";

export abstract class View<T> {

    private _elemento: JQuery;
    constructor(seletor: string) {
        this._elemento = $(seletor);
    }

    // @logarTempoDeExecucao()
    update(model: T): void {

        this._elemento.html(this.template(model));
    }

    abstract template(model: T): string;
}
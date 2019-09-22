import { View } from "./View";
import { Negociacao } from "../models/index";

export class NegociacoesView extends View<Negociacao[]> {

    template(modelo: Negociacao[]): string {

        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>

            <tbody>
                ${modelo.map(negociacao => 
                    `
                    <tr>
                        <td>${negociacao.data.toLocaleDateString()}</td>
                        <td>${negociacao.quantidade}</td>
                        <td>${negociacao.valor}</td>
                        <td>${negociacao.volume}</td>
                    </tr>
                    `).join('')}
                <tr>

                </tr>
            </tbody>

            <tfoot>
            </tfoot>
        </table>               
        `
    }
}
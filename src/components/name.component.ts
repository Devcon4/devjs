import { Component, model } from "../component";
import { TemplateResult, html } from "lit-html";

export class NameComponent extends Component {
    @model name: string;
    
    protected template(): TemplateResult {
        return html`<p>${this.name}</p>`;
    }

    constructor(parent: Component, name: string) {
        super(parent);
        this.name = name;
        // Observable.interval(1000).subscribe(n => this.name = this.name + n);
    }
}
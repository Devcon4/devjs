import { Component, model } from "../component";
import { NameComponent } from "./name.component";
import { html } from "lit-html";

export class TestComponent extends Component {
    @model names: string[] = [];

    template() {
        return html`<div>${
        (this.names || []).map(n => new NameComponent(this, n).build())
        }</div>`;
    }

    init() {
        // Observable.interval(100).subscribe(n => this.names =[...this.names, n+', ']);
    }

    constructor(parent: Component) {
        super(parent);
    }
}
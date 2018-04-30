import { Component, model } from "../component";
import { TemplateResult, html } from "lit-html";

export class ListItemComponent extends Component {
    @model name: string;

    protected template(): TemplateResult {
        return html`<li style="color: #42f4b0">${this.name}</li>`
    }

    constructor(parent: Component, name: string) {
        super(parent);
        this.name = name;
    }
}
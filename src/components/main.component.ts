import { Component, model } from "../component";
import { TemplateResult, html } from "lit-html";
import { TestComponent } from "./test.component";

export class MainComponent extends Component {
    @model recur;
    
    template(): TemplateResult {
        return html`<div>${(this.recur || []).map(r => new TestComponent(this).build())}</div>`;
    }
    
    constructor() {
        super(undefined);
        this.recur = [1];
    }
}
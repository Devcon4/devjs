import { Component } from "../component";
import { TemplateResult, html } from "lit-html";

export class HeaderComponent extends Component {
    protected template(): TemplateResult {
        return html`<div>Header!</div>`;
    }
    
}
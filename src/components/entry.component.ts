import { Component, model } from "../component";
import { TemplateResult, html } from "lit-html";
import { SidebarComponent } from "./sidebar.component";

export class EntryComponent extends Component {
    @model entry: string;

    template(): TemplateResult {
        return html`
            <div>
                <h3>Entry</h3>
                ${new SidebarComponent(this, 'Items!').build()}
            </div>`;
    }
    constructor() {
        super(undefined);
        this.entry = 'Entry';
    }

}


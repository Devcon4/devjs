import { Component, model } from "../component";
import { TemplateResult, html } from "lit-html";
import { Observable } from "rxjs/Observable";

export class SideItemComponent extends Component {
    @model sideItemName: string;
    
    protected template(): TemplateResult {
        return html`<label>${this.sideItemName}</label>`;
    }

    constructor(parent: Component, name: string) {
        super(parent);
        this.sideItemName = name;
    }

    init() {
        // Observable.interval(1000).do(console.log).subscribe(n => this.sideItemName = this.originalName + n);
    }
}
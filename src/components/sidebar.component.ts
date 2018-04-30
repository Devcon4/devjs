import { Component, model } from "../component";
import { TemplateResult, html } from "lit-html";
import { SideItemComponent } from "./side-item.component";
import { Observable } from "rxjs/Observable";
import { NameComponent } from "./name.component";
import { ListItemComponent } from "./list-item.component";

export class SidebarComponent extends Component {
    @model sidebarName: string;
    @model items: string[] = ['test', 'test0'];
    count = 1;
    originalName: string;

    protected template(): TemplateResult {
        // console.log(this);
        return html`
            <div>
                <h3>${this.sidebarName}</h3>
                <ul>
                    ${this.items.map(i => new ListItemComponent(this, i).build())}
                </ul>
            </div>
        `;
    }
                // <label>${this.items.map(t => new NameComponent(this, t).build())}</label>

    constructor(parent: Component, name: string) {
        super(parent);
        this.sidebarName = name;

        Observable.interval(1000).subscribe(i => {
            this.items = [...this.items, `test-${i}`];
            console.log(this.items);
        });

        // console.log(this.items.map(i => new NameComponent(this, i).build).join());
        // this.sidebarName = `${name}-${this.count}`;
        // this.originalName = name;
        // setInterval(x => {
        //     if (this.count > 15) { return; }
        //     this.items = [...this.items, `Test-${this.items.length}`];
        //     //this.sidebarName = `${name}-${this.count++}`;
        //     console.log(this.count);
        // }, 2000);
    }
}

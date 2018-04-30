import 'core-js/es6';
import 'core-js/es7/reflect';
import { TemplateResult, html as litHtml, render, Template } from 'lit-html';
import { Observable, Subject } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Completer } from 'readline';

class ComponentTools {
    static rootComponent: Component;
    static IsFirstRender = true;
    static rootId: string = uuid();
}

namespace RenderQueue {
    export let queue: Array<Function> = [];
    
    export function clearQueue() {
        RenderQueue.queue.reverse().forEach(q => {
            q();
        });
        RenderQueue.queue = [];
    }
}

export interface Component {
    parent: Component;
    init?(): void;
    update?(): void;
};
export abstract class Component {
    guid: string = uuid();

    protected abstract template(): TemplateResult;

    public build(): TemplateResult {
        // return this.template();
        return litHtml`<div id="${this.guid}">${this.template()}</div>`;
    }

    public render(isRoot = false) {
        RenderQueue.queue.push((() => {
            let r = this.build();
            render(r, document.getElementById(this.guid) || document.body);
        }).bind(this));

        if (isRoot && !ComponentTools.IsFirstRender) {
            RenderQueue.clearQueue();
        }

        if (ComponentTools.IsFirstRender) {
            ComponentTools.IsFirstRender = false;
            RenderQueue.clearQueue();
        }

        // let r = this.build();
        // render(r, !!this.parent ? r.template.element : document.body);
        // if(ComponentTools.IsFirstRender) {
        //     ComponentTools.IsFirstRender = false;
        //     ComponentTools.rootComponent = this;
        //     render(litHtml`<div id="${ComponentTools.rootId}"></div>`, document.body);
        //     this.build();
        // } else {
        //     if(!!this.parent){
        //         console.log(this);
        //         console.log(r);
        //         render(r, document.getElementById(`${this.parent.guid}`));
        //     } else {
        //         render(r, document.getElementById(`${ComponentTools.rootId}`));
        //     }
        // }
    }

    constructor(parent: Component) {
        this.parent = parent;
        
        if(!!this.init) {
            this.init.bind(this)();
        }
    }
}

export function devHtml(strings: TemplateStringsArray, ...values: any[]): TemplateResult {
    console.log(arguments)
    return litHtml({} as TemplateStringsArray, values);
}

export function model(target: any, key: string) {
    var _val;
    console.log(arguments);
    
    // functions instead of arrow functions because of lexical this.
    Object.defineProperty(target, key, {
        get: function() {
            return _val;
        },
        set: function(newVal) {
            _val = newVal;
            console.log(arguments);
            setTimeout(() => this.render(true), 0);
        }
    });
}

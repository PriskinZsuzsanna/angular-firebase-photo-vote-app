import { GuardsCheckStart } from "@angular/router";
import { Guid } from "guid-typescript";

export class Picture {
    id: string = Guid.create().toString()
    title: string = "";
    url: string = "";
    voters: string[]  = [''];
    displayName: string = '';
    email: string = '';
}

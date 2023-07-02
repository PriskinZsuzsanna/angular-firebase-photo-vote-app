import { GuardsCheckStart } from "@angular/router";
import { Guid } from "guid-typescript";

export class Picture {
    id: string = Guid.create().toString()
    title: string = "";
    url: string = "";
    votes: number = 0;
    displayName: string = '';
    email: string = '';
}

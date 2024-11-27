export class Action {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    execute(): void {
        console.log("Working!");
    }
}
"use strict";
class Action {
    constructor(name, defaultResult) {
        this.state = "idle";
        this.name = name;
        this.result = defaultResult;
    }
    execute() {
        console.log("Starting execution.");
        if (this.state !== "idle") {
            throw new Error("Action cannot be executed in it's current state.");
        }
        this.state = "executing";
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("Sleeping for 1s.");
                console.log("Done executing...");
                this.state = "completed";
                if (this.result) {
                    console.log(`Handing this.result to resolve method.`);
                    resolve(this.result);
                    console.log("Finished calling resolve.");
                }
            }, 1000);
        });
    }
}
let a1 = new Action("blep", "SHIT");
a1.execute().then((value) => {
    console.log(`Resolve method called! ${value}`);
});

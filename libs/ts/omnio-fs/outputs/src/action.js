"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
class Action {
    constructor(name) {
        this.name = name;
    }
    execute() {
        console.log("Working!");
    }
}
exports.Action = Action;

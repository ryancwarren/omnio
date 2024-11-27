"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
// Module Crypto
function sha1sum(filePath) {
    return "";
}
// Module File System
function ls(filePath) {
    return "";
}
function decorator(target, propertyKey, descriptor) {
    // decorator logic here
}
// Module Application
class Application {
    constructor(name) {
        this.name = name;
    }
    onExecuteTask() {
        console.log("onExecuteTask");
    }
    init() {
        console.log("Application init");
    }
    hello() {
        this.onExecuteTask();
        return "hello!";
    }
}
class ServerApplication extends Application {
    constructor(name) {
        super(name);
        this.homePath = path.join(os.homedir(), this.name);
        if (fs.existsSync(this.homePath)) {
            console.log(`File already exists ${this.homePath}`);
        }
        else {
            console.log(`File doesn't exist....`);
        }
    }
    init() {
        console.log("ServerApplication init");
    }
}
// const app = new Application("test");
// app.onExecuteTask();
// console.log(app.hello());
// const serverApp = new ServerApplication("test");
// serverApp.init();
// console.log(serverApp.homePath);

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
exports.Application = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
const mime = __importStar(require("mime-types"));
class Application {
    constructor(name) {
        this.name = `${name}`;
    }
    // Default Services!!!
    static ls(dirPath, arrayOfFiles = []) {
        let files = [];
        try {
            // Read the contents of the directory
            files = fs.readdirSync(dirPath);
        }
        catch (error) {
            console.error(`Unable to scan directory: ${error}`);
            return arrayOfFiles;
        }
        // Iterate over each item in the directory
        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            try {
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    // If the item is a directory, recurse into it
                    Application.ls(filePath, arrayOfFiles);
                }
                else {
                    // If it's a file, add its absolute path to the array
                    arrayOfFiles.push(path.resolve(filePath));
                }
            }
            catch (error) {
                console.error(`Error processing file ${filePath}: ${error}`);
            }
        });
        return arrayOfFiles;
    }
    static sha1sum(filePath) {
        try {
            const fileBuffer = fs.readFileSync(filePath);
            const sha1Hash = crypto.createHash('sha1');
            sha1Hash.update(fileBuffer);
            return sha1Hash.digest('hex');
        }
        catch (error) {
            throw new Error(`Error computing SHA-1 checksum: ${error.message}`);
        }
    }
    static mimeType(filePath) {
        try {
            // Get the file extension
            const extension = path.extname(filePath);
            // Use mime to lookup the MIME type for the extension
            const mimeType = mime.lookup(extension);
            if (!mimeType) {
                throw new Error(`Unable to determine MIME type for file extension ${extension}`);
            }
            return mimeType;
        }
        catch (error) {
            console.error(`Error getting MIME type: ${error.message}`);
            return 'application/octet-stream'; // Default MIME type for unknown files
        }
    }
}
exports.Application = Application;
// TODO
class FileCollection {
}
// export class ServerApplication extends Application {
//   homePath: string;
//   constructor(name: string) {
//     super(name);
//     this.homePath = path.join(os.homedir(), this.name);
//     if (fs.existsSync(this.homePath)) {
//       process.stdout.write(`File already exists ${this.homePath}`)
//     } else {
//       fs.mkdirSync(this.homePath, { recursive: false });
//     }
//   }
// }

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");
var mime = require("mime-types");
var exiftool_vendored_1 = require("exiftool-vendored");
var Application = /** @class */ (function () {
    function Application(name) {
        this.name = "".concat(name);
    }
    // Default Services!!!
    Application.ls = function (dirPath, arrayOfFiles) {
        if (arrayOfFiles === void 0) { arrayOfFiles = []; }
        var files = [];
        try {
            // Read the contents of the directory
            files = fs.readdirSync(dirPath);
        }
        catch (error) {
            console.error("Unable to scan directory: ".concat(error));
            return arrayOfFiles;
        }
        // Iterate over each item in the directory
        files.forEach(function (file) {
            var filePath = path.join(dirPath, file);
            try {
                var stat = fs.statSync(filePath);
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
                console.error("Error processing file ".concat(filePath, ": ").concat(error));
            }
        });
        return arrayOfFiles;
    };
    Application.sha1sum = function (filePath) {
        try {
            var fileBuffer = fs.readFileSync(filePath);
            var sha1Hash = crypto.createHash('sha1');
            sha1Hash.update(fileBuffer);
            return sha1Hash.digest('hex');
        }
        catch (error) {
            throw new Error("Error computing SHA-1 checksum: ".concat(error.message));
        }
    };
    Application.mimeType = function (filePath) {
        try {
            // Get the file extension
            var extension = path.extname(filePath);
            // Use mime to lookup the MIME type for the extension
            var mimeType = mime.lookup(extension);
            if (!mimeType) {
                throw new Error("Unable to determine MIME type for file extension ".concat(extension));
            }
            return mimeType;
        }
        catch (error) {
            console.error("Error getting MIME type: ".concat(error.message));
            return 'application/octet-stream'; // Default MIME type for unknown files
        }
    };
    Application.getExifDataSync = function (filePath) {
        var exiftool = new exiftool_vendored_1.ExifTool({ taskTimeoutMillis: 5000 });
        var exifData;
        var error;
        exiftool.read(filePath).then(function (tags) {
            console.log(tags);
        });
    };
    return Application;
}());
exports.Application = Application;
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
Application.getExifDataSync("./audio.mp3");

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import * as os from 'os';
import * as mime from 'mime-types';
import { ExifTool } from 'exiftool-vendored';



export class Application {
  name: string;

  constructor(name: string) {
    this.name = `${name}`;
  }

  // Default Services!!!

  static ls(dirPath: string, arrayOfFiles: string[] = []): string[] {
    let files: string[] = [];
  
    try {
      // Read the contents of the directory
      files = fs.readdirSync(dirPath);
    } catch (error) {
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
        } else {
          // If it's a file, add its absolute path to the array
          arrayOfFiles.push(path.resolve(filePath));
        }
      } catch (error) {
        console.error(`Error processing file ${filePath}: ${error}`);
      }
    });
  
    return arrayOfFiles;
  }

  static sha1sum(filePath: string): string {
    try {
      const fileBuffer = fs.readFileSync(filePath);
      const sha1Hash = crypto.createHash('sha1');
      sha1Hash.update(fileBuffer);
      return sha1Hash.digest('hex');
    } catch (error) {
      throw new Error(`Error computing SHA-1 checksum: ${(error as Error).message}`);
    }
  }

  static mimeType(filePath: string): string {
    try {
      // Get the file extension
      const extension = path.extname(filePath);
      
      // Use mime to lookup the MIME type for the extension
      const mimeType = mime.lookup(extension);
      
      if (!mimeType) {
        throw new Error(`Unable to determine MIME type for file extension ${extension}`);
      }
  
      return mimeType;
    } catch (error) {
      console.error(`Error getting MIME type: ${(error as Error).message}`);
      return 'application/octet-stream'; // Default MIME type for unknown files
    }
  }

}

// TODO

class FileCollection {
  // Or file transform?
  // IMPL as action pattern?
  // Organize files by mime-type.  Group-by property?
  // Create an action that moves all of the files.  It has a temp-trash bucket.
  //  It shows what files were and we're theyre going.
  //  
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



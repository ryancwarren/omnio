// Basic Types
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3]; // Array of numbers
let list2: [string, number] = ["hello", 10]; // Tuple type
let notSure: any = 4;
let u: undefined = undefined;
let n: null = null;

// Interfaces
interface Person {
  name: string;
  age: number;
  readonly id: number; // Property can't be reassigned after initialization
}

let user: Person = {
  name: "Hayes",
  age: 30,
  id: 12345
};

// Classes
class Animal {
  protected name: string;
  constructor(theName: string) { this.name = theName; }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  constructor(name: string) { super(name); }
  bark() {
    console.log('Woof! Woof!');
  }
}

const dog = new Dog("Tommy");
dog.bark(); // "Woof! Woof!"
dog.move(10); // "Tommy moved 10m."

// Generics
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");  // Type of output will be 'string'

// Generic class
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => x + y;

// Enums
enum Direction {
  Up,
  Down,
  Left,
  Right
}

let direction: Direction = Direction.Up;

// Type Inference
let x = 3; // TypeScript infers this as number

// Union Types: can be one of several types
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

// Intersection Types: combine multiple types into one
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

type ArtworksResponse = ArtworksData & ErrorHandling;

const response: ArtworksResponse = {
  success: true,
  artworks: [{ title: 'Mona Lisa' }]
};

// Type Guards and Differentiating Types
interface Fish { swim: () => void }
interface Bird { fly: () => void }

function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}

// Async/Await for handling promises
async function fetchData(url: string): Promise<string> {
  const response = await fetch(url);
  return await response.text();
}

// Decorators (experimental but powerful)
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`The method ${propertyKey} was called with arguments: ${JSON.stringify(args)}`);
    const result = originalMethod.apply(this, args);
    console.log(`The method ${propertyKey} returned: ${JSON.stringify(result)}`);
    return result;
  };
  return descriptor;
}

class Greeter {
  @log
  greeting(word: string) {
    return "Hello, " + word;
  }
}

const greeter = new Greeter();
greeter.greeting("world");

// Modules (ES Module syntax)
import { greet } from './greeter'; // Assumes there's a greeter.ts file
greet("TypeScript");

// Mapped Types: Create types based on existing types
type Readonly<T> = {
  readonly [P in keyof T]: T[P]; // 'keyof' creates a type that represents all property keys of T as union
};

interface Todo {
  title: string;
  description: string;
}

const todo: Readonly<Todo> = {
  title: "Hello",
  description: "there"
};
// todo.title = "world"; // Error: Cannot assign to 'title' because it is a read-only property.

// Conditional Types: For type transformations
type ExtractUppercase<T> = T extends `${infer F}${infer R}` ? 
    (Uppercase<F> extends F ? `${F}${ExtractUppercase<R>}` : never) : 
    T;

type T0 = ExtractUppercase<'abc'>;  // never
type T1 = ExtractUppercase<'AbC'>;  // "ABC"

// Running this file would require a Node.js environment with TypeScript support or transpiling it to JavaScript first
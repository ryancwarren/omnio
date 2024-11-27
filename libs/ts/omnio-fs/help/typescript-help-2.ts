

function demo1() {
    // Typescript object spreading.
    let obj1 = {
        "name":"Ryan",
        "age":42
    }
    let obj2 = {...obj1, "Address":"520 Main Street"};
    console.log(obj2);
}

function demo2() {
    // A crude, and forced way to destructure a map or hash into args.
    // Note typescript doesn't have named-args like in python.
    function createPerson(name: string, age: number) {
        console.log(`Creating person, ${name}, ${age}`)
    }
    let args = {
        name: "Ryan",
        age: 42
    }
    console.log(Object.entries(args));
    createPerson(...Object.values(args) as [string, number]);
}

function demo3() {
    // Function Parameter Destructuring.
    function createPerson1({name, age} : {name: string, age: number}) {
        console.log(name, age);
    }
}

function demo4() {
    let person = {
        name: "Ryan",
        age: 42
    }
    // Object Destructuring
    let {name, age} = person;
    console.log(name, age);

    // Array Destructuring
    let items: number[] = [0,1,2];
    let [one, two, ...rest] = items;
    console.log(one,two, rest);

}

demo4();
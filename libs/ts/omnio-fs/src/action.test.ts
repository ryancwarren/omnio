// function add(a: number, b:number){
//     return a + b;
// }

// describe('add function', () => {
//     test('adds 1 + 2 to equal 3', () => {
//       expect(add(1, 2)).toBe(3);
//     });
// });


import { Action } from './action';

describe('Action class usage', () => {
  let a1 = new Action("a1");
  a1.execute();
  test('Mock', () => {
    expect(true).toEqual(true);
  })
})

describe('Action class defaut services - Listing Files', () => {
  test('t1', () => {
    let a1 = new Action("a1");

  });
});
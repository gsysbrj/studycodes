"use strict";

const o = {};
o.a = 15;

Object.defineProperty(o, 'b', {
    value: 20,
    writable: true,
    configurable: false,
    enumerable: true,
})

o.b = 30;
console.log(o)

let pd = Object.getOwnPropertyDescriptor(o, 'b')
console.log(pd)
pd.configurable = true;

Object.defineProperty(o, 'b', pd)
pd = Object.getOwnPropertyDescriptor(o, 'b')
console.log(pd)

// delete o.b;
console.log(o);

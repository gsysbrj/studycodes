// 递归求和

function sum(n) {
    if (n === 1) return 1;
    return n + sum(n - 1);
}

let s = sum(100);

console.log(s);

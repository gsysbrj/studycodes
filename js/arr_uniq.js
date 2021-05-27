var arr=['12','32','89','12','12','78','12','32'];
// 速度最快， 占空间最多（空间换时间）
function unique2(array){
    var n = {}, r = [], type;
    for (var i = 0; i < array.length; i++) {
        // type = typeof array[i];
        // console.log(type)
        if (!n[array[i]]) {
            // n[array[i]] = [type];
            n[array[i]] = true;
            r.push(array[i]);
        // } else if (n[array[i]].indexOf(type) < 0) {
        } else {
            // n[array[i]].push(type);
            // r.push(array[i]);
        }
        console.log(n)
    }
    return r;
}

let newArr = unique2(arr);
console.log(newArr);

console.log([...new Set(arr)])
console.log(Array.from(new Set(arr)))

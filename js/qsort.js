const arr = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 10, 11, 13, 12, 5, 4];

// 冒泡排序
// 找出最小，找出次小，......（这是个错误的实现，这是一个未优化到位的选择排序算法实现）
function sort1(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        console.log(`i=${i} j=: ` + arr.toString())
    }
}

// 选择排序
function sort4(a) {
    for (let i=0; i<a.length; i++) {
        let s = i;
        for (let j = i+1; j < a.length; j++) {
            if (a[j] < a[s]) {
                s = j
            }
        }
        if (a[i] > a[s]) {
            let temp = a[i]
            a[i] = a[s]
            a[s] = temp
        }
        console.log(`i=${i} j=: ` + a.toString())

    }
}

// 插入排序
function sort2(a) {
    for (let j = 1; j < a.length; j++) {
        let temp = a[j];
        let i;
        for (i = j - 1; i >= 0; i--) {
            if (temp < a[i]) {
                a[i+1] = a[i] // 把比a[j]大的元素往后移动
            } else {
                break;
            }
        }
        a[i+1] = temp;
        console.log(`i=${i} j=${j} temp=${temp}: ` + arr.toString())
    }
}


// 快速排序
function sort3(a, l, r) {
    if (l >= r) return;
    
    let i = l;
    let j = r;
    let x = a[i];
    while (i < j) {
        for (; j > i; j--) {
            if (a[j] < x) {
                a[i] = a[j]
                i++
                break
            }
        }
        for (; i < j; i++) {
            if (a[i] > x) {
                a[j] = a[i]
                j--
                break
            }
        }
    }
    a[i] = x;

    let loc = i;
    sort3(a, l, loc)
    sort3(a, loc+1, r)
}

// sort2(arr);
sort1(arr)
// sort4(arr)
// sort3(arr, 0, arr.length-1);
console.log(arr.toString());


// 二分查找
let a2 = [1, 2, 3, 5, 7, 9, 10, 11, 13, 15, 18, 100, 101];
console.log(bSearch(100, a2))
console.log(bSearch2(100, a2, 0, a2.length-1))

function bSearch(t, a) {
    let l = 0;
    let r = a.length - 1;
    while(l <= r) {
        let mid = Math.floor((l + r) / 2);
        if (t === a[mid]) {
            return mid;
        }
        if (t < a[mid]) {
            r = mid - 1;
        } else if (t > a[mid]) {
            l = mid + 1
        }
        console.log(`l=${l} r=${r} mid=${mid}`)
    }

    return -1;
}

function bSearch2(t, a, l, r) {
    if (l > r) return -1;

    let mid = Math.floor((l + r) / 2);
    console.log(`l=${l} r=${r} mid=${mid}`)
    if (t < a[mid]) {
        return bSearch2(t, a, l, mid-1)
    }
    if (t > a[mid]) {
        return bSearch2(t, a, mid+1, r)
    }

    return mid;
}

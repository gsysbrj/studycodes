const arr = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 10, 11, 13, 12, 5, 4];

// 冒泡排序
// 从前往后，两两比较，大的后移 or 从后往前，两两比较，小的前移
function sort1(a) {
    for (let i=0; i<a.length-1; i++) {
        for (let j=0; j<a.length - i; j++) {
            // 从前往后，两两比较，大的后移
            if (a[j] > a[j+1]) {
                [a[j], a[j+1]] = [a[j+1], a[j]]
            }
        }
        console.log(`i=${i} j=: ` + a.toString())
    }
}

// 选择排序
// 找最小放位置0、次小放位置1......
function sort4(a) {
    for (let j = 0; j < a.length - 1; j++) {
        let s = j;
        for (let i = j+1; i < a.length; i++) {
            if (a[i] < a[s]) {
                s = i
            }
        }
        if (a[s] < a[j]) {
            [a[s], a[j]] = [a[j], a[s]]
        }
    }
}

// 插入排序
// 为未排序的元素一个一个地找位置
function insertionSort(a) {
    for (let j = 1; j < a.length; j++) {
        let e = a[j]
        let i = j - 1
        for (; i >= 0 && a[i] > e; i--) {
            a[i+1] = a[i]
        }
        a[i+1] = e
    }
}

// 快速排序
// 选出基准，找其位置；递归到底，分而治之
function partition(a, l, r) {
    let base = a[l];
    let i = l, j = r;
    while(i < j) { // i == j 时循环终止
        // 从后往前，找一个比base小的数, 移动到base的左边，同时空出一个位置，此位置的右边的数都大于base
        for (; j>i; j--) {
            if (a[j] < base) {
                a[i] = a[j]
                i++ // 位置i已经找到数了
                break
            }
        }
        // 从前往后，找一个比base大的数，移动到base的右边，放到刚刚空出的位置上
        for (; i<j; i++) {
            if (a[i] > base) {
                a[j] = a[i]
                j-- // 位置j已经找到数了
                break
            }
        }
    }
    a[i] = base; // 此时，i === j
    return i;
}

function partition2(a, l, r) {
    let x = a[r];
    let i = l - 1
    for (let j = l; j < r; j++) {
        if (a[j] <= x) {
            i++
            [a[i], a[j]] = [a[j], a[i]]
        }
    }
    [a[i+1], a[r]] = [a[r], a[i+1]]
    return i+1;
}

function quickSort(a, l, r) {
    if (l >= r) return; // 小于一个元素直接退出
    let p = partition2(a, l, r)
    quickSort(a, l, p-1)
    quickSort(a, p+1, r)
}

// 归并排序：分而治之，然后归并
function merge(a, l, d, r){
    let a1 = a.slice(l, d+1)
    a1.push(Number.POSITIVE_INFINITY)
    let a2 = a.slice(d+1, r+1)
    a2.push(Number.POSITIVE_INFINITY)
    let j1 = 0
    let j2 = 0
    for (let i = l; i <= r; i++) {
        if (a1[j1] <= a2[j2]) {
            a[i] = a1[j1]
            j1++
        } else {
            a[i] = a2[j2]
            j2++
        }
    }
}

function merge2(a, l, d, r){
    let a1 = a.slice(l, d+1)
    let a2 = a.slice(d+1, r+1)
    let j1 = 0
    let j2 = 0
    let i = l
    for (; i <= r && j1 < a1.length && j2 < a2.length; i++) {
        if (a1[j1] <= a2[j2]) {
            a[i] = a1[j1]
            j1++
        } else {
            a[i] = a2[j2]
            j2++
        }
    }
    if (j1 < a1.length) {
        for (; j1 < a1.length; j1++) {
            a[i] = a1[j1]
            i++
        }
    } else {
        for (; j2 < a2.length; j2++) {
            a[i] = a2[j2]
            i++
        } 
    }
}

function mergeSort(a, l, r) {
    if (l >= r) return
    let d = Math.floor((l + r)/2)
    mergeSort(a, l, d)
    mergeSort(a, d+1, r)
    merge2(a, l, d, r)
}

// 堆排序: 利用最大堆的特征，依次把最大的元素冒上来
function maxHeapify(a, i, heapSize) {
    let l = 2 * i
    let r = 2 * i + 1

    let largest
    if (l < heapSize && a[i] < a[l])
        largest = l
    else
        largest = i
    if (r < heapSize && a[largest] < a[r])
        largest = r
    
    if (largest !== i) {
        [a[i], a[largest]] = [a[largest], a[i]]
        maxHeapify(a, largest, heapSize)
    }
}

function heapSort(a) {
    // build Max-Heap
    let heapSize = a.length
    for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) {
        maxHeapify(a, i, heapSize)
    }
    // pop the largest element and maintain the max-heap repeatly
    for (let j = a.length - 1; j >= 1; j--) {
        [a[0], a[j]] = [a[j], a[0]]
        heapSize--
        maxHeapify(a, 0, heapSize)
    }
}

// 希尔排序。插入排序的改进版
function shellSort(a) {
    let N = a.length;
    let h = 1;
    while (h < Math.floor(N/3)) {
        h = h * 3 + 1
    }
    for ( ; h >= 1; h = Math.floor(h/3)) {
        for (let i = h; i < N; i++) {
            let key = a[i]
            let j = i - h;
            for (; j >= 0 && a[j] > key; j -= h) {
                a[j + h] = a[j]
            }
            a[j + h] = key
        }
    }
}

console.log(arr.toString())
// sort1(arr)
// sort4(arr)
// insertionSort(arr);
// quickSort(arr, 0, arr.length-1);
// mergeSort(arr, 0, arr.length-1)
// heapSort(arr)
shellSort(arr)
console.log(arr.toString());


let a2 = [1, 2, 3, 5, 7, 9, 10, 11, 13, 15, 18, 100, 101];
console.log(bSearch(1, a2))
console.log(bSearch(101, a2))
console.log(bSearch(11, a2))
console.log(bSearch(8, a2))
console.log(bSearch2(1, a2))
console.log(bSearch2(101, a2))
console.log(bSearch2(11, a2))
console.log(bSearch2(8, a2))

// 二分查找：折半查找，往中间挤

// 不用递归，一个循环
function bSearch(t, a) {
    let l = 0;
    let r = a.length - 1;
    while(l <= r) {
        let mid = Math.floor((l+r)/2)
        if (t === a[mid]) {
            return mid
        } else if (t > a[mid]) {
            l = mid+1
        } else {
            r = mid - 1
        }
    }
    return -1
}

// 递归实现
function bSearch2(t, a) {
    return _bSearch2(t, a, 0, a.length-1)
}

function _bSearch2(t, a, l, r) {
    if (l > r) return -1
    let mid = Math.floor((l+r)/2)
    if (t === a[mid]) {
        return mid;
    }
    if (t > a[mid]) {
        return _bSearch2(t, a, mid+1, r)
    }
    return _bSearch2(t, a, l, mid-1)
}

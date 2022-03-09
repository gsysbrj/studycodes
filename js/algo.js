let s = new Set()
while (s.size < 200000) {
    let a = Math.floor(Math.random() * 1000000000)
    s.add(a)
}
let input = [...s]
console.log(input)

// 堆排序思想：构造最大堆，重复修正，依次取得新堆最大值
function maxHeapify(a, i, heapSize) {
    let l = 2 * i
    let r = 2 * i + 1

    let largest;
    if (l < heapSize && a[l] > a[i]) {
        largest = l
    } else {
        largest = i
    }
    if (r < heapSize && a[r] > a[largest]) {
        largest = r
    }
    if (largest !== i) {
        [a[i], a[largest]] = [a[largest], a[i]]
        maxHeapify(a, largest, heapSize)
    }
}
// function maxHeapify(a, i, heapSize) {
//     let l = 2 * i
//     let r = 2 * i + 1

//     let largest
//     if (l < heapSize && a[i] < a[l])
//         largest = l
//     else
//         largest = i
//     if (r < heapSize && a[largest] < a[r])
//         largest = r
    
//     if (largest !== i) {
//         [a[i], a[largest]] = [a[largest], a[i]]
//         maxHeapify(a, largest, heapSize)
//     }
// }
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

let t0 = Date.now()
heapSort(input)
let t1 = Date.now()
console.log(input)
console.log(`heapSort consume: ${t1 - t0}ms`)

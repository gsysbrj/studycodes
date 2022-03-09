let s = new Set<number>()
while (s.size < 200000) {
  let a = Math.floor(Math.random() * 1000000000)
  s.add(a)
}
let input = [...s]
console.log(input)

/* 插入排序 */
function insertionSort(input: number[]) {
  for(let i = 1; i < input.length; i++) {
    let key = input[i]
    let j = i - 1
    while(j >= 0 && input[j] > key){
      input[j + 1] = input[j]
      j--
    }
    input[j + 1] = key
  }
}

/* 归并排序 */

function merge(input: number[], p: number, q: number, r: number) {
  let a1 = input.slice(p, q+1)
  let a2 = input.slice(q+1, r+1)
  a1.push(Number.POSITIVE_INFINITY)
  a2.push(Number.POSITIVE_INFINITY)
  let i = 0
  let j = 0
  for (let k = p; k <= r; k++) {
    if (a1[i] <= a2[j]) {
      input[k] = a1[i]
      i++      
    } else {
      input[k] = a2[j]
      j++
    }
  }
}
function mergeSort(input: number[], p: number, r: number) {
  if (p < r) {
    let q = Math.floor((p+r)/2)
    mergeSort(input, p, q)
    mergeSort(input, q+1, r)
    merge(input, p, q, r)
  }
}

/* 快排 */
function partation(A: number[], p: number, r: number) {
  let x = A[r]
  let i = p - 1
  // i是分位点，j是将要检查元素
  for (let j = p; j < r; j++){
    if (A[j] <= x) {
      i++
      [A[i], A[j]] = [A[j], A[i]]
    }
  }
  [A[i+1], A[r]] = [A[r], A[i+1]]
  return i+1
}
function quickSort(A: number[], p: number, r: number){
  if (p < r) {
    let q = partation(A, p, r)
    quickSort(A, p, q-1)
    quickSort(A, q+1, r)
  }
}

// 堆排序思想：构造最大堆，重复修正，依次取得新堆最大值
function maxHeapfy(A: number[], i:number, heapSize: number) {
  let largest;
  let l = 2 * i + 1
  let r = 2 * i + 2
  if (l < heapSize && A[l] > A[i]) {
    largest = l
  } else {
    largest = i
  }
  if (r < heapSize && A[r] > A[largest]) {
    largest = r
  }
  if (largest !== i) {
    [A[i], A[largest]] = [A[largest], A[i]]
    maxHeapfy(A, largest, heapSize)
  }
}
function buildMaxHeap(A: number[], heapSize: number) {
  for (let i = Math.floor(A.length/2) - 1; i >= 0; i--) {
    maxHeapfy(A, i, heapSize)
  }
}
function heapSort(A: number[]){
  let heapSize = A.length
  buildMaxHeap(A, heapSize)
  for (let i = A.length - 1; i > 0; i--) {
    [A[0], A[i]] = [A[i], A[0]]
    heapSize--
    maxHeapfy(A, 0, heapSize)
  }
}
// let t0 = Date.now()
// insertionSort(input)
// let t1 = Date.now()
// console.log(input)
// console.log(`insertionSort consume: ${t1 - t0}ms`)
// let t0 = Date.now()
// mergeSort(input, 0, input.length-1)
// let t1 = Date.now()
// console.log(input)
// console.log(`mergeSort consume: ${t1 - t0}ms`)
// let t0 = Date.now()
// quickSort(input, 0, input.length-1)
// let t1 = Date.now()
// console.log(input)
// console.log(`quickSort consume: ${t1 - t0}ms`)
let t0 = Date.now()
heapSort(input)
let t1 = Date.now()
console.log(input)
console.log(`heapSort consume: ${t1 - t0}ms`)

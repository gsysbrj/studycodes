
# 几种基本排序算法

# 冒泡排序
def buble_sort(a):
    for i in range(len(a) - 1):
        for j in range(len(a) - 1 - i):
            if a[j] > a[j+1]:
                a[j], a[j+1] = a[j+1], a[j]

# 选择排序
def selection_sort(a):
    for i in range(len(a)):
        smallest = i
        for j in range(i+1, len(a)):
            if a[j] < a[smallest]:
                smallest = j
        a[i], a[smallest] = a[smallest], a[i]

arr = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 10, 11, 13, 12, 5, 4]
# buble_sort(arr)
selection_sort(arr)
print(arr)

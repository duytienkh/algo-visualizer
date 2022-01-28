import BaseSort from "./BaseSort";

class HeapSort extends BaseSort {
    down_heap(n, i) {
        let cur = this.a[i];
        while (i < n) {
            let child = (i * 2) + 1;
            if (child >= n)
                break;
            if (child + 1 < n && this.compare(child, child + 1)) ++child;
            if (!this.compare(i, child))
                break;
            this.swap(i, child);
            i = child;
        }
    }
    sort() {
        let n = this.a.length;
        for (let i = n / 2 - 1; i >= 0; --i)
            this.down_heap(n, i);
        for (let i = n - 1; i > 0; --i) {
            this.swap(0, i);
            this.correct(i);
            this.down_heap(i, 0);
        }
        this.correct(0);
    }
}

export default HeapSort

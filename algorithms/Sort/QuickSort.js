import BaseSort from "./BaseSort";

class QuickSort extends BaseSort {
    compare(i, j) {
        if (i == j) return false;
        this.steps.push([i, j, null, null]);
        return this.a[i] < this.a[j];
    }
    swap(i, j) {
        if (i != j) {
            var x = this.a[i];
            this.a[i] = this.a[j];
            this.a[j] = x;
            this.steps.push([i, j, this.a.slice(), null])
        }
        if (i == this.pivot || j == this.pivot)
            this.pivot = (i + j - this.pivot);
    }
    quicksort(l, r) {
        if (l >= r) {
            if (l == r)
                this.correct(l);
            return;
        }
        this.pivot = Math.ceil((l + r) / 2);
        var left = l, right = r;
        while (left <= right) {
            while (this.compare(left, this.pivot)) ++left;
            while (this.compare(this.pivot, right)) --right;
            if (left <= right) {
                this.swap(left, right);
                ++left;
                --right;
            }
        }
        for (var i = right + 1; i <= left - 1; ++i)
            this.correct(i);
        // in practice we just need to check `<`
        // but i use `<=` because I need to get sorted positions.
        if (left <= r)
            this.quicksort(left, r);
        if (l <= right)
            this.quicksort(l, right);
    }
    sort() {
        var n = this.a.length;
        this.quicksort(0, n - 1);
    }
}

export default QuickSort

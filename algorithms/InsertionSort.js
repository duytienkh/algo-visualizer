import BaseSort from "./BaseSort";

class InsertionSort extends BaseSort {
    sort() {
        var n = this.a.length;
        for (var i = 0; i < n; ++i) {
            for (var j = i - 1; j >= 0 && this.compare(j + 1, j); --j) {
                this.swap(j, j + 1);
            }
        }
        for (var i = 0; i < n; ++i)
            this.correct(i);
    }
}

export default InsertionSort

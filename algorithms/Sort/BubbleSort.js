import BaseSort from "./BaseSort";

class BubbleSort extends BaseSort {
    sort() {
        var n = this.a.length;
        for (var i = 0; i < n; ++i) {
            for (var j = 0; j < n - i - 1; ++j) {
                if (this.compare(j + 1, j)) //a[j] >  a[j + 1]
                    this.swap(j, j + 1);
            }
            this.correct(n - i - 1); //n - i - 1 is in the correct position
        }
    }
}

export default BubbleSort

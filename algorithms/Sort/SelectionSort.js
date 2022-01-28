import BaseSort from "./BaseSort";

class SelectionSort extends BaseSort {
    sort() {
        var n = this.a.length;
        for (var i = 0; i < n; ++i) {
            var cur_min = i;
            for (var j = i + 1; j < n; ++j)
                if (this.compare(j, cur_min))
                    cur_min = j;

            if (cur_min != i)
                this.swap(cur_min, i);
            this.correct(i);
        }
    }
}

export default SelectionSort

class BaseSort {
    constructor(array) {
        this.a = array.slice();
        //steps is an array of tuple
        //each tuple has 4 fields, (i, j, array, correct)
        // case:
        //      - correct is not null: we have just placed the element `correct` to the correct position
        //      - array is null: we are comparing `i`, `j` at this step
        //      - array is not null: we have just swapped `i`, `j` at this step, and `array` is the new array
        this.steps = [];
    }

    compare(i, j) {
        this.steps.push([i, j, null, null]);
        return this.a[i] < this.a[j];
    }

    swap(i, j) {
        var x = this.a[i];
        this.a[i] = this.a[j];
        this.a[j] = x;
        this.steps.push([i, j, this.a.slice(), null])
    }

    correct(i) {
        this.steps.push([null, null, null, i]);
    }

    get_steps() {
        this.sort()
        return this.steps;
    }
    sort() { }
}

export default BaseSort

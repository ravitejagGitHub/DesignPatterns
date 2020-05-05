
class NewCalculator {
    constructor() {
        this.multiply = function(term1, term2) {
            return term1 * term2;
        };
        this.divide = function(term1, term2) {
            return term1 / term2;
        };
    }
}

module.exports = NewCalculator;
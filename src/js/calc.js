var Calc = {

    calculateMatchPoint: function (p, r) {
        var points = 0;
        if (!p || !r) return points;

        var compare = function (a, b) {
            if(a > b) return 1;
            else if(a < b) return -1;
            else return 0;
        };

        if (compare(Number(p.ScoreA), Number(p.ScoreB)) === compare(Number(r.ScoreA), Number(r.ScoreB)))
            points += 1;
        if (Number(p.ScoreA) === Number(r.ScoreA) && Number(p.ScoreB) === Number(r.ScoreB))
            points += 1;
        return points;
    },
}
function Main() {

    var db = new DataAdapter();

    var init = function (){
        loadPlayers();
    };

    var loadPlayers = function(){
        $("#main-panel").kendoListView({
            dataSource: getPlayerDataSource(),
            template: getPlayerPanelTemplate(),
        });
    };

    var getPlayerPanelTemplate = function (data) {
        return kendo.template(
        "<div class='sub-panel'> \
            <div class='widget-panel'> \
                    <span class='widget-tile' style='background-color:#=BGColor#'></span> \
                    <div class='widget-body'>\
                        <label class='widget-title'>#=Name#</label> \
                        <label class='widget-point' style='color:#=Color#'>#=Points#</label> \
                        <label class='widget-text' style='color:#=Color#'>POINTS</label> \
                    </div> \
                    <div class='widget-footer'> \
                        <label class='widget-scores'>See Matches</label> \
                        <label class='widget-scores' style='display:none;'>See Points</label> \
                    </div> \
                </div> \
            </div> \
        ");
    };

    var getPlayerDataSource = function () {
        return new kendo.data.DataSource({
            data: $.map(db.getPlayers(), function(e) {
                return $.extend(e, { Points: calculatePoints(e.Id) });
            }),
        });
    };

    var calculatePoints = function (id) {
        return db.getMatchResults().reduce(function(total, matchResult){
            var playerMatch = db.getPlayerSingleMatch(id, matchResult.Id);
            return total + calculateMatchPoint(playerMatch, matchResult);
        }, 0);
    };

    var calculateMatchPoint = function (p, r) { 
        var points = 0;
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
    };
 
    init();
}
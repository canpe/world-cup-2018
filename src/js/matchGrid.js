function MatchGrid () {

    var db = new DataAdapter();

    this.load  = function(element) {
        element.kendoGrid({
            dataSource: getDataSource(element),
            columns: getColumns(),
            height: 280,
            scrollable: true,
        });
    };

    var getDataSource = function(element) {
        var playerId = Number(element.data("player"));
        return new kendo.data.DataSource({
            data: $.map(db.getMatches(), function(e) {
                return $.extend(e, { 
                    TeamA: db.getTeam(e.A),
                    TeamB: db.getTeam(e.B),
                    Score: db.getMatchResult(e.Id),
                    PlayerMatch: db.getPlayerSingleMatch(playerId, e.Id),
                    Points: Calc.calculateMatchPoint(db.getPlayerSingleMatch(playerId, e.Id), db.getMatchResult(e.Id)),
                });
            }),
        });
    };

    var getColumns = function () {
        var columns = [];
        columns.push(getTeamATemplate());
        columns.push(getScoreTemplate());
        columns.push(getTeamBTemplate());
        columns.push(getPlayerMatchTemplate());
        return columns;
    };

    var getTeamATemplate = function() {
        return {
            field: "TeamA",
            template: getTeamAElement,
            width: 30,
        }
    };

    var getScoreTemplate = function() {
        return {
            field: "Score",
            template: getScoreElement,
            width: 20,
        }
    };

    var getTeamBTemplate = function() {
        return {
            field: "TeamA",
            template: getTeamBElement,
            width: 30,
        }
    };

    var getPlayerMatchTemplate = function () {
        return {
            field: "PlayerMatch",
            template: getPlayerMatchElement,
            width: 40,
        }
    };

    var getTeamAElement = function(dataItem, field){
        var name = dataItem.TeamA.Name;
        var short = dataItem.TeamA.Short;
        var source = dataItem.TeamA.Flag;
        return "<span title=' " + name + " '>" + short + "</span><img style='float:right;' src='" + source + "' height='16' width='32'>"; 
    };

    var getTeamBElement = function(dataItem, field){
        var name = dataItem.TeamB.Name;
        var short = dataItem.TeamB.Short;
        var source = dataItem.TeamB.Flag;
        return "<span style='float:right;' title=' " + name + " '>" + short + "</span><img src='" + source + "' height='16' width='32'>"; 
    };

    var getScoreElement = function(dataItem){
        if (dataItem["Score"]) { 
            var scoreA = dataItem["Score"].ScoreA;
            var scoreB = dataItem["Score"].ScoreB;
            return "<div style='text-align:center;'><span>" + scoreA + "</span> - <span>" + scoreB + "</span></div>"; 
        }
        return "<span>-</span>";
    };

    var getPlayerMatchElement = function(dataItem){
        var scoreA = dataItem["PlayerMatch"].ScoreA;
        var scoreB = dataItem["PlayerMatch"].ScoreB; 
        var points = dataItem["Points"]; 
        return "<div style='text-align:center;'><span>" + scoreA + "</span> - <span>" + scoreB + "</span><span style='margin-left:0.75em;'>(" + points + " pts)</span></div>"; 
    };
}
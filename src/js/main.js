function Main() {

    var db = new DataAdapter();
    var jsonServer = new JSONServer();
    var grid = new MatchGrid ();

    var init = function (){
        loadData();
    };

    var loadData = function () {
        jsonServer.getResults("round1", function(results1) {
            db.updateMatchResults(results1);
            jsonServer.getResults("round2", function(results2) { 
                db.updateMatchResults(results2);
                jsonServer.getResults("round3", function(results3) {
                    db.updateMatchResults(results3);
                    loadPlayers();
                });
            });
        });
    };

    var bindEvents = function () {
        $(".widget-seeMatches").on("click", function(e){
            var element = $(e.target);
            var widget = element.closest(".widget-panel");
            widget.find(".widget-point").hide();
            widget.find(".widget-text").hide();
            widget.find(".widget-matches").slideDown();
            widget.find(".widget-seeMatches").hide();
            widget.find(".widget-seePoints").fadeIn();
        });
        $(".widget-seePoints").on("click", function(e){
            var element = $(e.target);
            var widget = element.closest(".widget-panel");
            widget.find(".widget-point").slideDown();
            widget.find(".widget-text").slideDown();
            widget.find(".widget-matches").hide();
            widget.find(".widget-seeMatches").fadeIn();
            widget.find(".widget-seePoints").hide();
        });
    };

    var loadPlayers = function(){
        $("#main-panel").kendoListView({
            dataSource: getPlayerDataSource(),
            template: getPlayerPanelTemplate(),
            dataBound: function() {
                loadMatches();
                bindEvents();
            },
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
                        <div data-player='#=Id#' class='widget-matches' style='display:none;'></div> \
                    </div> \
                    <div class='widget-footer'> \
                        <label class='widget-scores widget-seeMatches'>See Matches</label> \
                        <label class='widget-scores widget-seePoints' style='display:none;'>See Points</label> \
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
            return total + Calc.calculateMatchPoint(playerMatch, matchResult);
        }, 0);
    };

    var loadMatches = function () {
        $(".widget-matches").each(function(){
            grid.load($(this));
        });
    };
 
    init();
}
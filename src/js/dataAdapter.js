function DataAdapter () {

    this.getPlayers = function () {
        return _getPlayers();
    };

    this.getMatches = function () {
        return _getMatches();
    };

    this.getGroups = function () {
        return _getGroups();
    };

    this.getTeams = function () {
        return _getTeams();
    };

    this.getAllPlayerMatches = function () {
        return _getPlayerMatches();
    };

    this.getMatchResults = function () {
        return _getMatchResults();
    };

    this.getPlayer = function (id) {
        var result = $.grep(_getPlayers(), function(e){ return e.Id == id; }); 
        return result.length > 0 ? result[0] : null;
    };

    this.getMatch = function (id) {
        var result = $.grep(_getMatches(), function(e){ return e.Id == id; }); 
        return result.length > 0 ? result[0] : null;
    };   

    this.getGroup = function (id) {
        var result = $.grep(_getGroups(), function(e){ return e.Id == id; }); 
        return result.length > 0 ? result[0] : null;
    };

    this.getTeam = function (id) {
        var result = $.grep(_getTeams(), function(e){ return e.Id == id; }); 
        return result.length > 0 ? result[0] : null;
    };

    this.getPlayerMatches = function (id) {
        var result = $.grep(_getPlayerMatches(), function(e){ return e.Id == id; }); 
        return result.length > 0 ? result[0] : null;
    };

    this.getPlayerSingleMatch = function (playerId, matchId) {
        var resultPlayer = $.grep(_getPlayerMatches(), function(e){ return e.Id == playerId; }); 
        if (resultPlayer.length > 0) {
            var resultMatch = $.grep(resultPlayer[0].Matches, function(e){ return e.Id == matchId; }); 
            return resultMatch.length > 0 ? resultMatch[0] : null;
        }
        return null;
    };

    var _getPlayers = function () {
        return Data.Players;
    };
    
    var _getMatches = function () {
        return Data.Matches;
    };  

    var _getGroups = function () {
        return Data.Groups;
    };

    var _getTeams = function () {
        return Data.Teams;
    };

    var _getPlayerMatches = function () {
        return Data.PlayerMatches;
    };

    var _getMatchResults = function () {
        return Data.MatchResults;
    };
}
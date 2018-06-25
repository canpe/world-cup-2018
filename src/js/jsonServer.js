function JSONServer () {

    var JSONServerURL = "https://my-json-server.typicode.com/canpe/WorldCupResultsJSON";

    this.getResults = function (roundName, callback) {
        var URL = JSONServerURL + "/" + roundName;
        $.ajax({
            type: "GET",
            url: URL,
            dataType: "json",
            asyc: true,
            success: function (result){
                if (callback !== undefined){
                    callback(result);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                kendo.alert(xhr.status + " " + thrownError);
            }
        });	

    };
}
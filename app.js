function WikiViewer() {
    //cache dom
    let $clear = $('#clear');
    let $search = $('#search');
    let $searchTerm = $('#search-term');
    let $searchResult = $('#search-result');
    $clear.hide();

    //events
    $search.on('click', () => {
        getData();
        $searchTerm.val('');
    });
    $clear.on('click', () => {
        clearResult();
    });

    //get wiki data thru API
    function getData() {
        let wikiAPI = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + $searchTerm.val() + "&format=json&callback=?";
        $.getJSON(wikiAPI, (data) => {
            clearResult();
            appendResult(data);
            $clear.show();
        });
    }

    function appendResult(data) {
        for (let i = 0; i < data[1].length; i++) {
            $searchResult.append("<div class='card'><div class='card-header'>" + data[1][i] +
                "</div><div class='card-block'><p class='card-text'>" + data[2][i] + "</p><a href='" + data[3][i] +
                "' class ='btn btn-primary' target='_blank'> view the page</a></div></div>");
        }
    }

    function clearResult() {
        $clear.hide();
        $searchResult.empty();
    }
}

WikiViewer();
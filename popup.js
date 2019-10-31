function buildEntry(data) {
    return "<div class=\"ui divider\"></div>" +
        "<div class=\"ui card\">" +
            "<div class=\"content\">" +
                "<div class=\"header\">" + data.hwd + "</div>" +
                "<div class=\"meta\">" + data.lexcat + "</div>" +
            "</div>" +
            "<div class=\"content\">" +
                "hejsan" +
            "</div>" +
        "</div>";
}

function buildOtherHeadwordsMsg(otherHeadwords) {
    return otherHeadwords;
}

function processResult(origItem) {
    return function (page) {
        let exactMatch = false;
        let exactMatchEntry = null;
        let otherHeadwords = [];

        $(page).find(".entry").each(function (idx) {
            let hwd = $(this).find("span.head span.hwd-group span.hwd").html();
            if (hwd == origItem) {
                exactMatch = true;

                let main = $(this).find("span.lv1-group");

                let groups = [];
                main.find("span.form-group").each(function (idx) {
                    let lexcat = $(this).find("span.psa-group span.psa").html();
                });

                let lexcat = main.find("span.form-group span.psa-group span.psa").html();
                let data = {
                    hwd: hwd,
                    lexcat: lexcat,
                };
                exactMatchEntry = buildEntry(data);
            }
            else {
                otherHeadwords.push(hwd);
            }
        });

        $("#search-form").removeClass("loading");
        if (!exactMatch) {
            $(".result").html(buildOtherHeadwordsMsg(otherHeadwords));
        }
        else {
            $(".result").html(exactMatchEntry);
        }
    };
}

function search() {
    let item = $("#search-item").val();
    let searchUrl = "https://ne.ord.se/ordbok/svenska/engelska/sök/" + item;

    $("#search-form").addClass("loading");
    $.get(searchUrl, processResult(item));
}

$(document).ready(function() {
    $("#orig-item-not-found-msg").addClass("hidden");
    $("#search-item").focus();

    $("#search-form").submit(search);
    $("#search-item").keyup(function(event) {
        if ($(this).is(":focus") && event.key == "Enter") {
            search();
        }
    });
});

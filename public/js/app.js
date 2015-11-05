function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

function getResult() {
    // prep request
    var req = gapi.client.youtube.search.list({
        part: 'snippet',
        type: 'video',
        q: encodeURIComponent($('#word').text().replace(/%20/g, '+')),
        maxResults: 1
    });

    // execute request
    req.execute(function(res) {
        // console.log(res);

        var results = res.result.items;

        $.each(results, function(index, item){
            // console.log(item);
            // console.log(item.id.videoId);
            $.get('tpl/vid.html', function(data){
                $('body').append(tplawesome(data, [{"videoid": item.id.videoId}]));
            });
            // $('body').append(item.id.videoId + ' ' + item.snippet.title + '<br>');
        });
    });
}

function init() {
    gapi.client.setApiKey('AIzaSyAOns8uchTUHEgg20F_pGhKQ4gL2_S3c6w');
    gapi.client.load('youtube', 'v3', function() {
        // yt api ready
        getResult();
    });
}
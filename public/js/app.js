function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

function getResult() {
    // populate categories
    var categoryNames = [];

    $.get('https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=AIzaSyAOns8uchTUHEgg20F_pGhKQ4gL2_S3c6w', function(data){
        console.dir(data);
        $.each(data.items, function(index, item){
            categoryNames.push(item.snippet.title);
        });
    });

    var req = gapi.client.youtube.search.list({
        part: 'snippet',
        type: 'video',
        chart: 'mostPopular',
        order: 'viewCount',
        contentRegion: 'US',
        videoCategoryId: categoryNames[ Math.floor( Math.random() * categoryNames.length ) ],
        videoDefinition: 'high',
        maxResults: 50
    });

    console.dir(req);

    // execute request
    req.execute(function(res) {
        console.log(res);

        var results = res.result.items;

        var item = results[ Math.floor( Math.random() * results.length ) ];

        // $.each(results, function(index, item){
            console.log(item);
            // console.log(item.id.videoId);
            $.get('tpl/vid.html', function(data){
                $('#video').html(tplawesome(data, [{"videoid": item.id.videoId}]));
            });
            // $('body').append(item.id.videoId + ' ' + item.snippet.title + '<br>');
        // });
    });
}

function init() {
    gapi.client.setApiKey('AIzaSyAOns8uchTUHEgg20F_pGhKQ4gL2_S3c6w');
    gapi.client.load('youtube', 'v3', function() {
        // yt api ready
        getResult();
    });
}
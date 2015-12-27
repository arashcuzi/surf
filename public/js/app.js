function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

var categories = [];
var add2DB = false;
var count = 0;

function getResult() {

    var videosUrl = 'https://www.googleapis.com/youtube/v3/videos?';

    var catIndex = Math.floor( Math.random() * categories.length );

    // console.log('cat index is: ' + catIndex);

    var catId = categories[ catIndex ];

    // console.log('category id is: ' + catId);

    var params = {
        part: 'snippet',
        type: 'video',
        chart: 'mostPopular',
        order: 'viewCount',
        contentRegion: 'US',
        videoCategoryId: catId,
        videoDefinition: 'high',
        maxResults: 50
    };

    Object.keys(params).forEach(function(item, index){
        videosUrl += (item.toString() + '=' + params[item].toString() + '&');
    });

    videosUrl += 'key=AIzaSyAOns8uchTUHEgg20F_pGhKQ4gL2_S3c6w';

    // console.log(videosUrl);

    $.get(videosUrl, function(data){
        // console.log('video results:');
        // console.dir(data);
    });

    var req = gapi.client.youtube.search.list({
        part: 'snippet',
        type: 'video',
        order: 'viewCount',
        contentRegion: 'US',
        // videoCategoryId: catId,
        videoDefinition: 'high',
        maxResults: 50
    });

    // execute request
    req.execute(function(res) {
        // console.log(res);

        // var results = res.items;

        if (add2DB) {
            populateDB(res, true);
        }

        var item = results[ Math.floor( Math.random() * results.length ) ];

        $.each(results, function(index, item){
            // console.log(item);
            // console.log(item.id.videoId);
            $.get('tpl/vid.html', function(data){
                $('#video').html(tplawesome(data, [{"videoid": item.id.videoId}]));
            });
            $('body').append(item.id.videoId + ' ' + item.snippet.title + '<br>');
        });
    });
}

function init() {
    gapi.client.setApiKey('AIzaSyAOns8uchTUHEgg20F_pGhKQ4gL2_S3c6w');
    gapi.client.load('youtube', 'v3', function() {
        // yt api ready
        // populate categories
        // $.get('https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=AIzaSyAOns8uchTUHEgg20F_pGhKQ4gL2_S3c6w', function(data){
        //     // console.dir(data);
        //     $.each(data.items, function(index, item){
        //         categories.push(item.id);
        //     });

            // console.dir(categories);

            // getResult();
        // });

        getFromDb();
    });
}

function populateDB(data, bool) {
    count++;

    if (bool) {
        $.post('/db', {data: data.items}, function(){
            console.log('cool!');
        });
    }

    if (data.nextPageToken) {
        $.get('https://content.googleapis.com/youtube/v3/search?maxResults=50&order=viewCount&part=snippet&type=video&videoDefinition=high&contentRegion=US&pageToken=' + data.nextPageToken + '&key=AIzaSyAOns8uchTUHEgg20F_pGhKQ4gL2_S3c6w', function(data){
            $.post('/db', {data: data.items}, function(){
                console.log('populateDB has been called ' + count + ' times.');
                populateDB(data, false);
            });
        });
    }
}

function getFromDb() {

    $.get('/db', function(data){
        var index = Math.floor( Math.random() * data.length );

        var item = data[index];

        console.log(index);
        console.dir(item);

        $.get('tpl/vid.html', function(data){
            $('#video').html(tplawesome(data, [{"videoid": item.videoId}]));
        });
    });
}
//Youtube API Key//
//var apiKey = "AIzaSyDM-7tpcEt81FBj0rXfcZISLeftBPXkK1Y"; //primary
var apiKey = "AIzaSyBPq1nTMS98dX64VjKOrROZmgflT9bd14Y"; //secondery

//Channel ID//
var channelId = "UC5p2HB41JVstSICaaqOr_oA";

  //GET Channel//
  $.get("https://www.googleapis.com/youtube/v3/channels", {
      part: "contentDetails",
      id: channelId,
      key: apiKey
    },
    function(data) {
      $.each(data.items, function(i, item) {
        console.log(item);
        //Up Load ID//
        pid = item.contentDetails.relatedPlaylists.uploads;
        getVids(pid);

      })
    }
  );


  //Video Getting Funtion//
  function getVids(pid) {
    $.get("https://www.googleapis.com/youtube/v3/playlistItems", {
        key: apiKey,
        playlistId: pid,
        part: "snippet,id",
        maxResults: "5"
      },
      function(data) {
        console.log(data);
        var html = "";
        //Videos Showing Funtion//
        for (var a = 0; a < data.items.length; a++) {
          //html+= "<a href='video-detials.html'>";
          html += "<button id='bu' onclick='selectVideo(this);' data-id='" + data.items[a].snippet.resourceId.videoId + "'>";
          html += "<div class='card bg-dark' style='width:18em;'>"
          html += "<img class='card-img-top' src='" + data.items[a].snippet.thumbnails.maxres.url + "' alt='Card image cap'>";
          html += "<div class='card-body'>";
          html += "<h5 class='card-title'>" + data.items[a].snippet.title + "</h5>";
          html += "</div>";
          html += "</div>";
          html += "</button>";
          //html+="</a>";
        }
        // Video Show in Main HTML//
        $("#output").append(html)
      }
    )
  }

////////////////////////////////////////////////////////

//Video Page Section//

  //GET Channel Videos//
  $.get("https://www.googleapis.com/youtube/v3/search", {
      part: "id,snippet",
      channelId: channelId,
      key: apiKey,
      maxResults: "50"
    },
    //Vodeos Get//
    function(data) {
      console.log(data);
      var html = "";
      for (var a = 0; a < data.items.length; a++) {
        //html+="<a href='video-detials.html'>";
        html += "<button id='bu' onclick='selectVideo(this);' data-id='" + data.items[a].id.videoId + "'>";
        html += "<div class='card bg-dark' style='width:18em;'>"
        html += "<img class='card-img-top' src='" + data.items[a].snippet.thumbnails.high.url + "' alt='Card image cap'>";
        html += "<div class='card-body'>";
        html += "<h5 class='card-title'>" + data.items[a].snippet.title + "</h5>";
        html += "</div>";
        html += "</div>";
        html += "</button>";
        //html+="</a>";
      }
      //Videos Show in Videos.html//
      $("#view").html(html),
      document.getElementById("view").view;
    }
  );

  
///////////////////////////////////////////////////////////////////////////////

//Video Selection Funtion//
function selectVideo(self) {
  var videoId = self.getAttribute("data-id");
  console.log(videoId);
  $.get("https://www.googleapis.com/youtube/v3/videos", {
      part: "statistics,snippet",
      key: apiKey,
      id: videoId
    },
    //Video Show in iframe//
    function(data) {
      console.log(data);
      var html = "";
      html += "<iframe height='600px'; width='100%'; src\='//www.youtube.com/embed/" + videoId + "\'frameborder='0'></iframe>";
      $("#show").html(html);
      document.getElementById("show").show;

    }
  );
}
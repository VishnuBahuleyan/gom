//Youtube API Key//
//var apiKey = "AIzaSyDM-7tpcEt81FBj0rXfcZISLeftBPXkK1Y";//primary
var apiKey="AIzaSyBPq1nTMS98dX64VjKOrROZmgflT9bd14Y";//secondery

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
      part: "snippet",
      maxResults: "5"
    },
    function(data) {
      console.log(data);
      var html = "";
      //Videos Showing Funtion//
      for (var a = 0; a < data.items.length; a++) {
        html += "<button id='bn' onclick='selectVideo(this); 'data-id='" + data.items[a].id.videoId + "'>";
        html += "<div class='card bg-dark' style='width:28rem;'>"
        html += "<img class='card-img-top' src='" + data.items[a].snippet.thumbnails.maxres.url + "' alt='Card image cap'>";
        html += "<div class='card-body'>";
        html += "<h5 class='card-title'>" + data.items[a].snippet.title + "</h5>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
      }
      // Video Show HTML//
      $("#output").html(html)
    }
  )
}
////////////////////////////////////////////////////////

//Video Page Funtion//
$(document).ready(function() {

  //GET Channel Videos//
  $.get("https://www.googleapis.com/youtube/v3/search", {
      part: "id,snippet",
      channelId: channelId,
      key: apiKey,
      maxResults: "50"
    },

    //Video Showing HTML//
    function(data) {
      console.log(data);
      var html = "";
      var view = "";

      for (var a = 0; a < data.items.length; a++) {
        html += "<button id='bn' onclick='selectVideo(this);' data-id='" + data.items[a].id.videoId + "'>";
        html += "<div class='card bg-dark' style='width:28rem;'>";
        html += "<img class='card-img-top' src='" + data.items[a].snippet.thumbnails.high.url + "' alt='Card image cap'>";
        html += "<div class='card-body'>";
        html += "<h5 class='card-title'>" + data.items[a].snippet.title + "</h5>";
        html += "</div>";
        html += "</div>";
        html += "<button>";
      }
      //Output to HTML//
      $("#view").html(html);
      var view;
      videoPrint(view, item);

    }
  );
});

//Videos Print Funtion//
function videoPrint(view) {
  document.getElementById("view").innerHTML = view.item.html;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function selectVideo(self) {
  var videoId = self.getAttribute("data-id");
  var url = "https://www.googleapis.com/youtube/v3/videos?key=" + apiKey + "&id=" + videoId + "&part=statistics,snippet";
  $.ajax({
    url: url,
    method: "GET",
    success: function(data) {
      console.log(data);
      var html = "";
      var show = "";
      html += "<li><iframe height='600px'; width='100%'; src\='//www.youtube.com/embed/" + videoId + "\'></frame></>";
      $("#show").html(html);
      videoPlay(show);

      // videoDetails(videoId);
      //showComments(videoId);
    }
  });
}

//Videos Plauing Funtion//
function videoPlay(show) {

  document.getElementById("show").innerHTML = show.items;
}


/*function showComments(videoId) {
  var url = "https://www.googleapis.com/youtube/v3/commentThreads?key=" + apiKey + "&videoId=" + videoId + "&part=snippet&maxResults=top50";

  $.ajax({
    url: url,
    method: "GET",
    success: function(response) {
      console.log(response);
      var html = "";

      for (var a = 0; a < response.items.length; a++) {
        html += "<li>";
        html += "<img src='" + response.items[a].snippet.topLevelComment.snippet.authorProfileImageUrl + "'>";
        html += response.items[a].snippet.topLevelComment.snippet.authorDisplayName;
        html += "<p>" + response.items[a].snippet.topLevelComment.snippet.textDisplay + "</p>";
        html += "<br>";
        html += "</li>";
      }

      $("#comments").html(html);
    }
  })


}

function videoDetails(videoId) {

  var url = "https://www.googleapis.com/youtube/v3/videos?key=" + apiKey + "&id=" + videoId + "&part=statistics,snippet";

  $.ajax({
    url: url,
    method: "GET",
    success: function(response) {
      console.log(response);
      var html = "";
      html += "<li>";
      //html+="<img src='"+response.items[0].snippet.thumbnails.maxres.url+"'>"
      html += "<p>" + response.items[0].snippet.title + "</p>"
      html += "<p>Views: " + response.items[0].statistics.viewCount + "<br>Likes: " + response.items[0].statistics.likeCount + "<br>Dislikes: " + response.items[0].statistics.dislikeCount + "</p>";
      html += "<p>" + response.items[0].snippet.description + "</p>";
      html += "</li>";
      $("#video-details").html(html);
    }
  });
}*/
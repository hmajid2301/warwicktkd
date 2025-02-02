//***********************************************
// news.js
// When a pagination page is clicked
// works out what articles would be on that
// page then uses ajax to get those articles back
// without needing a page refresh.
//**********************************************
$(document).ready(function() {
  $("body").on('click', '.pagination li ', function(e) {
    e.preventDefault();

    //remove active class from current element
    $(".pagination .active").removeClass("active");

    //get href page link to see which page to show (dynamically)
    var href = $(this).children().attr("href");

    //will store page number user is trying to see
    var pageNumber;
    //if href has no ?p=number, then make it equal to 1
    if(href == "news.php") {
      pageNumber = 1;
    }
    //else get number from href
    else {
      pageNumber = parseInt(href.match("[0-9]+"), 10);
    }

   //current page used in pagination to determine
   //what pages to show besides it
    var currentPage = pageNumber;

   // as this will be used for offset, (if only 5 articles);
   // then page number -1  = 0, 0 *5 = 0
   // offset in query will be 0. 
    pageNumber = (pageNumber - 1) * 5; 

    //using ajax sent pagenumber to php file which will return what
    // 5 articles summaries to display on the screen
    $.ajax ({
      type: "POST", 
      url: "getArticles.php",
      dataType: 'json', 
      data: {
        "pageNumber" : pageNumber,
        "currentPage" : currentPage
      },
      success: function(html) {
        //remove everything inside news-story div
        $(".news-story").empty();
        //apend html to div
        $(".news-story").append(html);
        //scroll to top
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }
    });
    
    //and add active class to clicked pagination
    $(this).addClass("active");
  });

  //hide pictures if video exists
  if($(".embed-responsive").length) {
    $(".news-story").find("img").hide();
  }
});

var postsArray = posts['items'];


console.log(postsArray.length);
var sortedPosts = postsArray.sort(function(a,b){
  a = Date.parse(a['item_published']);
  b = Date.parse(b['item_published']);

  if (a<b){
    return -1;
  }
  if(a>b){
    return 1;
  }
  return 0;
});
var iterateBy = 6;
var addPosts = sortedPosts.slice(0,10);
var currentPosition = 0;
var sortedPostsDouble = sortedPosts.concat(sortedPosts);


function getNewPosts(){
  if(currentPosition +iterateBy <= postsArray.length){
    addPosts = sortedPosts.slice(currentPosition, currentPosition+iterateBy);
    currentPosition=currentPosition+iterateBy;
    console.log(currentPosition);
  }else{    
    addPosts = sortedPostsDouble.slice(currentPosition, currentPosition+iterateBy);
    currentPosition=currentPosition-postsArray.length;
    console.log(sortedPostsDouble.length);
    console.log(currentPosition);
  }
}

function addPostsToContainer(sortedArray, masonry){
  for(var i = 0; i<sortedArray.length; i++){
    var post = sortedArray[i];
    var itemPublished=sortedArray[i]['item_published'];
    var serviceName = sortedArray[i]['service_name'];
    if(masonry){
      var $grid = $('.container-posts').isotope({
        itemSelector: '.post',
        percentPosition: true,
        masonry: {
        columnWidth: 300,
        gutter: 10
        }
      });
    }
    if(serviceName =="Manual"){
      var text=(post.item_data.text);
      var linkManual=(post.item_data.link);
      var linkTextManual=(post.item_data.link_text);
      var imageUrl=(post.item_data.image_url);
      var postMan='<li class="post manual"><div><img src="'+imageUrl+'"><p>'+text+'</p><a href="'+linkManual+'" target="_blank">'+linkTextManual+'</a></div></li>';
      var $postMan= $('<li class="post manual"><div><img src="'+imageUrl+'"><p>'+text+'</p><a href="'+linkManual+'" target="_blank">'+linkTextManual+'</a></div></li>');
      if(masonry){
        $grid.append( $postMan ).isotope( 'appended', $postMan );
      }else{
        $('.container-posts').append(postMan);
      }
    }
    if(serviceName =="Twitter"){
      var tweet=(post.item_data.tweet);
      var user=(post.item_data.user.username);
      var postTwit='<li class="post twit"><div><p>'+user+'</p><p class="tweet">'+tweet+'</p></div></li>';
      var $postTwit= $('<li class="post twit"><div><p>'+user+'</p><p class="tweet">'+tweet+'</p></div></li>');
      if(masonry){
        $grid.append( $postTwit ).isotope( 'appended', $postTwit );
      }else{
        $('.container-posts').append(postTwit);
      }
    }
    
    if(serviceName=="Instagram"){
      var thumb= (post.item_data.image.thumb);
      var userIG=(post.item_data.user.username);
      var caption=(post.item_data.caption);
      var linkIG=(post.item_data.link);
      var $postIG= $('<li class="post IG"><div><a href="'+linkIG+'" target="_blank"><img src="'+thumb+'"></a><p>'+userIG+'</p><p class="hashtags">'+caption+'</p></div></li>');
      if(masonry){
        $grid.append( $postIG ).isotope( 'appended', $postIG );
      }else{
        $('.container-posts').append(postIG);
      }
    }
  }
  createMasonry();
}

function createMasonry(){
  var $grid = $('.container-posts').isotope({
    itemSelector: '.post',
    percentPosition: true,
    masonry: {
    // use outer width of grid-sizer for columnWidth
    columnWidth: 300,
    gutter: 10
    }
  });
  $grid.imagesLoaded().progress( function() {
    $grid.isotope('layout');
  });

  $('button[data-filter=".manual"').click(function(){
    $grid.isotope({ filter: '.manual' });
    $('button').removeClass('active');
    $(this).addClass('active');
  });

  $('button[data-filter=".twit"').click(function(){
    $grid.isotope({ filter: '.twit' });
    $('button').removeClass('active');
    $(this).addClass('active');
  });

  $('button[data-filter=".IG"').click(function(){
    $grid.isotope({ filter: '.IG' });
    $('button').removeClass('active');
    $(this).addClass('active');
  });

  $('button[data-filter=".all"').click(function(){
    $grid.isotope({ filter: '*' });
    $('button').removeClass('active');
    $(this).addClass('active');
  });
}

function linkifyTweets(){
  var options = {/* … */};
  linkifyElement(document.getElementById('container-posts'), options, document);
  $('.tweet').linky({
    mentions: true,
    hashtags: true, 
    urls: true,
    linkTo: "twitter"
  });
$(".hashtags").linky({
    hashtags: true,
    urls: false,
    linkTo: "instagram"
  });}


addPostsToContainer(addPosts, false);
linkifyTweets();
function loadMore(){
  getNewPosts();
  addPostsToContainer(addPosts, true);
  linkifyTweets();
}
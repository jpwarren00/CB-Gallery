$(function(){
  // Track every video object on the page.
  $('video').each(function(i,obj){
       trackVideo(document.getElementsByTagName('video')[i]);
  });
  
  // Wrap tracking code in a function to apply to all videos
  function trackVideo(myvid){
       if(myvid.addEventListener) {
            myvid.addEventListener('seeked', seekedHandler, false);
            myvid.addEventListener('seeking', seekingHandler, false);
            myvid.addEventListener('play', playHandler, false);
            myvid.addEventListener('pause', pauseHandler, false);
            myvid.addEventListener('ended', endHandler, false);
       } 
  
       if (myvid.error) {
           switch (myvid.error.code) {
               case MEDIA_ERR_ABORTED:
                   alert("Video stopped before load.");
                   break;
               case MEDIA_ERR_NETWORK:
                   alert("Network error");
                   break;
               case MEDIA_ERR_DECODE:
                   alert("Video is broken");
                   break;
               case MEDIA_ERR_SRC_NOT_SUPPORTED:
                   alert("Codec is unsupported by this browser");
                   break;
             }
       }
  }
       
  //Set handlers for all pertinent media hooks in the omni library.
  function seekedHandler(e){
    // not used by CB.
  }
  
  function seekingHandler(e){
    // not used by CB.
  }
  
  function playHandler(e){
    var src=$(this).find("source").attr("src");
    s.Media.open(src,Math.round(this.duration),"HTML5 Browser");
    s.Media.play(src,0);
    console.log("Play: Duration: "+Math.round(this.duration)+" + "+$(this).find("source").attr("src"));
  }
  
  function pauseHandler(e){
    
  }
  
  function endHandler(e){
    var src=$(this).find("source").attr("src");
    s.Media.stop(src,Math.round(this.currentTime));
    s.Media.close(src);
    console.log(" STOP: "+Math.round(this.currentTime) +": "+src);
  };
});
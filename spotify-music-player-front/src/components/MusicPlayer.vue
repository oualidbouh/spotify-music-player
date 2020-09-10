<template>
   <div id="muscic-player-container" class="row">
       <div id="image-container" class="col-lg-4">
            <img src="http://www.laurentrieppi.com/wp-content/uploads/2011/02/californication1.jpg" width="350" height="350" id="music-cover">
       </div>
       <div class="col-lg-8" id="music-info">
           <div id="music-player-info">
            <div class="row music-info">
                <i class="fa fa-music"></i>           
                <span>Red Hot Chilie pepper</span>
            </div>
            <div class="row music-info">
               <i class="fa fa-user"></i>
                <span class="txt">Red Hot Chilie pepper</span>
            </div>
            <div class="row music-info">
              <i class="fa fa-laptop"></i>
                <span>Red Hot Chilie pepper</span>
            </div>
       </div>
        <div class="music-player-buttons">
            <div class="row">
                <div class="col-lg-2">
                    <i class="fa fa-random"></i>
                </div>
                <div class="col-lg-2">
                    <i class="fa fa-backward"></i>
                </div>
                <div class="col-lg-2">
                    <i class="fa fa-play"></i>
                </div>
                <div class="col-lg-2">
                    <i class="fa fa-forward"></i>
                </div>
                <div class="col-lg-2">
                    <i class="fa fa-repeat"></i>
                </div>
            </div>
        </div>
       </div>
   </div>
</template>

<script>
export default {
      name: "MusicPlayer"
}
</script>

<style>
#muscic-player-container{
    background-color: grey;
    height: 600px;
}

#image-container{
    padding-top: 80px;
}

#music-info{
    padding-top: 80px;   
}

#music-cover{
max-width:100%;
max-height:100%;
}

.music-info{
    padding: 15px;
    color: white;
    font-size: 40px;
    font-family :sans-serif;
}
.music-player-buttons{
    color: white;
    font-size: 30px;
}
</style>
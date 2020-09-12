<template>
   <div id="muscic-player-container" class="row">
       <div id="image-container" class="col-lg-4">
            <img src="http://www.laurentrieppi.com/wp-content/uploads/2011/02/californication1.jpg" width="350" height="350" id="music-cover">
       </div>
       <div class="col-lg-8" id="music-info">
           <div id="music-player-info">
            <div class="row music-info">
                <i class="fa fa-music"></i>           
                <span>{{currentTrack.item.name}}</span>
            </div>
            <div class="row music-info">
               <i class="fa fa-user"></i>
                <span class="txt">{{currentTrack.item.album.artists[0].name}}</span>
            </div>
            <div class="row music-info">
              <i class="fa fa-laptop"></i>
                <span>{{currentDevice.name}}</span>
            </div>
       </div>
        <div class="music-player-buttons">
            <div class="row">
                <div class="col-lg-2">
                    <i class="fa fa-random" v-on:click="shuffle"></i>
                </div>
                <div class="col-lg-2">
                    <i class="fa fa-backward" v-on:click="previous"></i>
                </div>
                <div class="col-lg-2" v-if="!currentTrack.is_playing">
                    <i class="fa fa-play" v-on:click="play"></i>
                </div>
                <div class="col-lg-2" v-if="currentTrack.is_playing">
                    <i class="fa fa-pause" v-on:click="pause"></i>
                </div>
                <div class="col-lg-2">
                    <i class="fa fa-forward" v-on:click="next"></i>
                </div>
                <div class="col-lg-2">
                    <i class="fa fa-repeat" v-on:click="repeat"></i>
                </div>
            </div>
        </div>
       </div>
   </div>
</template>

<script>
import axios from 'axios';
const backend_url = 'http://localhost:9000'

export default {
      name: "MusicPlayer",
      data(){
          return {
            currentTrack : {},
            currentDevice : {},
          }
      },
    created(){
       this.fetchCurrentTrackRunningOnDevice();
    },
    methods:{
        shuffle(){
            axios.get(`${backend_url}/action?action=shuffle&status=${!this.currentTrack.shuffle_state}`)
            .then(() =>{
                this.fetchCurrentTrackRunningOnDevice()
            }).catch(() => {
            });
        },
        next(){
            axios.get(`${backend_url}/action?action=next`)
            .then(() =>{
                this.fetchCurrentTrackRunningOnDevice()
            }).catch(() => {
            });
        },
        previous(){
             axios.get(`${backend_url}/action?action=previous`)
            .then(() =>{
                this.fetchCurrentTrackRunningOnDevice()
            }).catch(() => {
            });
        },
        play(){
            axios.get(`${backend_url}/action?action=play`)
            .then(() =>{
                this.fetchCurrentTrackRunningOnDevice()
            }).catch(() => {
            });
        },
        pause(){
            axios.get(`${backend_url}/action?action=pause`)
            .then(() =>{
                this.fetchCurrentTrackRunningOnDevice()
            }).catch(() => {

            });
        },
        repeat(){
            let repeatState = '';
            if(this.currentTrack.repeat_state === "off"){
                repeatState = "track";
            } else{
                repeatState = "off"
            }
            axios.get(`${backend_url}/action?action=repeat&status=${repeatState}`)
            .then(() =>{
                this.fetchCurrentTrackRunningOnDevice()
            }).catch(() => {

            });
        },
        fetchCurrentTrackRunningOnDevice(){
            const currentTrackRequest = axios.get(`${backend_url}/currently-playing`);
            const currentDeviceRequest = axios.get(`${backend_url}/current-device`);

            axios.all([currentTrackRequest, currentDeviceRequest]).then(axios.spread((...responses) => { 
                this.currentTrack = responses[0].data;
                this.currentDevice = responses[1].data;
            })).catch(() => {
                console.log('an error occured while fetching data');
            });
        }
    }
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
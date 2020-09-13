<template>
<div id="muscic-player-container" class="row">
    <div class="row center-bloc">
        <div id="image-container" class="col-lg-4">
            <img src="http://www.laurentrieppi.com/wp-content/uploads/2011/02/californication1.jpg" id="music-cover">
        </div>
        <div class="col-lg-8">
            <div class="col music-player-info">
                <table class="music-info">
                    <tr>
                        <td colspan="1"><i class="fa fa-music"></i></td>
                        <td colspan="4"><span class="font-weight-bold">{{currentTrack.item.name}}</span></td>
                    </tr>
                    <tr>
                        <td colspan="1"><i class="fa fa-user"></i></td>
                        <td colspan="4"><span>{{currentTrack.item.album.artists[0].name}}</span></td>
                    </tr>
                    <tr>
                        <td colspan="1"><i class="fa fa-laptop"></i></td>
                        <td colspan="4"><span>{{currentDevice.name}}</span></td>
                    </tr>
                    <tr>
                        <td colspan="5">
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="w-25"><i class="fa fa-random"></i></td>
                        <td class="w-25"><i class="fa fa-backward"></i></td>
                        <td class="w-25" v-if="!currentTrack.is_playing"><i class="fa fa-play" v-on:click="play"></i></td>
                        <td class="col-lg-2" v-if="currentTrack.is_playing"><i class="fa fa-pause" v-on:click="pause"></i></td>                        <td class="w-25"><i class="fa fa-forward"></i></td>
                        <td class="w-25"><i class="fa fa-repeat"></i></td>
                    </tr>
                </table>
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

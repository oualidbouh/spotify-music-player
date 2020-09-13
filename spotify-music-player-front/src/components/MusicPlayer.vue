<template>
<div id="muscic-player-container" class="row">
    <div class="row center-bloc">
        <div id="image-container" class="col-lg-4">
            <img :src="coverImage" id="music-cover">
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
                        <td class="w-25"><i class="fa fa-random" v-on:click="shuffle"></i></td>
                        <td class="w-25"><i class="fa fa-backward" v-on:click="previous"></i></td>
                        <td class="w-25" v-if="!currentTrack.is_playing"><i class="fa fa-play" v-on:click="play"></i></td>
                        <td class="w-25" v-if="currentTrack.is_playing"><i class="fa fa-pause" v-on:click="pause"></i></td>
                        <td class="w-25"><i class="fa fa-forward" v-on:click="next"></i></td>
                        <td class="w-25"><i class="fa fa-repeat" v-on:click="repeat"></i></td>
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
    data() {
        return {
            currentTrack: {},
            currentDevice: {},
            coverImage: ''
        }
    },
    created() {
        this.fetchCurrentTrackRunningOnDevice();
    },
    methods: {
        shuffle() {
            axios.get(`${backend_url}/action?action=shuffle&status=${!this.currentTrack.shuffle_state}`)
                .then(() => {
                    this.fetchCurrentTrackRunningOnDevice()
                }).catch(() => {
                    alert('an error occured, please retry again');
                });
        },
        next() {
            axios.get(`${backend_url}/action?action=next`)
                .then(() => {
                    this.fetchCurrentTrackRunningOnDevice()
                }).catch(() => {
                    alert('an error occured, please retry again');
                });
        },
        previous() {
            axios.get(`${backend_url}/action?action=previous`)
                .then(() => {
                    this.fetchCurrentTrackRunningOnDevice()
                }).catch(() => {
                    alert('an error occured, please retry again');
                });
        },
        play() {
            axios.get(`${backend_url}/action?action=play`)
                .then(() => {
                    this.fetchCurrentTrackRunningOnDevice()
                }).catch(() => {
                    alert('an error occured, please retry again');
                });
        },
        pause() {
            axios.get(`${backend_url}/action?action=pause`)
                .then(() => {
                    this.fetchCurrentTrackRunningOnDevice()
                }).catch(() => {
                    alert('an error occured, please retry again');
                });
        },
        repeat() {
            let repeatState = '';
            if (this.currentTrack.repeat_state === "off") {
                repeatState = "track";
            } else {
                repeatState = "off"
            }
            axios.get(`${backend_url}/action?action=repeat&status=${repeatState}`)
                .then(() => {
                    this.fetchCurrentTrackRunningOnDevice()
                }).catch(() => {
                    alert('an error occured, please retry again');
                });
        },
        fetchCurrentTrackRunningOnDevice() {
            const currentTrackRequest = axios.get(`${backend_url}/currently-playing`);
            const currentDeviceRequest = axios.get(`${backend_url}/current-device`);

            axios.all([currentTrackRequest, currentDeviceRequest]).then(axios.spread((...responses) => {
                this.currentTrack = responses[0].data;
                this.currentDevice = responses[1].data;
                axios.get(`${backend_url}/tracker-cover?track_id=${this.currentTrack.item.id}`)
                .then((res) => {
                    this.coverImage = res.data[0].url
                }).catch(() => {
                    alert('error while fetching track cover');
                });
            })).catch(() => {
                alert('an error occured while fetching data, please retry again');
            });
        }
    }
}
</script>

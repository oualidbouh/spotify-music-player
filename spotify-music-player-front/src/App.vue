<template>
    <div class="d-md-flex h-md-100 ">
        <div class="col-md-4 p-0 bg-indigo h-md-100 text-center">
            <div class="d-md-flex  h-md-100 p-5 justify-content-center">
                <div class="logoarea" style="padding: 0rem!important;">
                    <strong>
                        <h1 style="color: black; font-size: 4.5em; "> Music </h1>
                    </strong>
                </div>
            </div>
        </div>
        <div class="col-md-8 p-0 h-md-100 loginarea">
            <div class="d-md-flex  h-md-100 p-5 justify-content-center">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-2">
                            <div id="myNav" class="overlay">
                                <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                                <div class="overlay-content">
                                    <div class="container-fluid">
                                        <div class="row" style="margin-bottom: 2rem;">
                                            <div class="col-sm-12 text-center">
                                                <h1 style="color: white; font-size: 3rem;">MENU</h1>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-3"
                                                style="background-image: url(Images/Bulb.jpg);  background-size: cover; background-repeat: no-repeat; background-position: 50% 50%;">
                                                <h1 style="color: white;">Light</h1>
                                            </div>
                                            <div class="col-sm-3"
                                                style="background-image: url(Images/Music.jpg);  background-size: cover; background-repeat: no-repeat; background-position: 50% 50%;">
                                                <h1 style="color: white;">Music</h1>
                                            </div>
                                            <div class="col-sm-3"
                                                style="background-image: url(Images/Picture.jpg);  background-size: cover; background-repeat: no-repeat; background-position: 50% 50%;">
                                                <h1 style="color: white;">Picture</h1>
                                            </div>
                                            <div class="col-sm-3"
                                                style="background-image: url(Images/ToDo.jpg);  background-size: cover; background-repeat: no-repeat; background-position: 50% 50%;">
                                                <h1 style="color: white;">ToDo</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h1 style="font-size:30px;cursor:pointer; color: white;">
                                <span v:on-click="openNav()">Menu</span>
                            </h1>

                        </div>
                        <div class="col-md-2" style="text-align-last: right;">
                            <strong id="txt" style="font-size: 2rem; color: white;"></strong>
                        </div>

                        <div class="col-md-8" style="text-align-last: center;">
                            <strong style="font-size: 2rem; color: white;">
                                {{nameOfTheDay}}
                            </strong>

                        </div>
                    </div>
                    <div class="row " style="margin: auto">
                        <div class="container-fluid" style="margin: auto">
                            <div class="jumbotron"
                                style="padding: 1rem 1rem !important;  background: rgba(255, 255, 255, 0.5); margin-bottom: 0rem !important; ">
                                <div class="row">
                                    <div class="col-sm-12">
                                        
                                        //SPOTIFY WEB PLAYER

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid" style="margin-top: 0.5em;">
                            <div class="row">
                                <div class="col-sm-12">
                                    <strong style="font-size: 2rem; color: white;">BACK</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data(){
    return{
      nameOfTheDay: ''
    }
  },
  created(){
    function startTime() {
      var d = new Date();
      var h = d.getHours();
      var m = d.getMinutes();
      m = checkTime(m);
      document.getElementById('txt').innerHTML = " " + h + ":" + m;
    }
    function checkTime(i) {
      var j = i;
      if (i < 10) {
        j = "0" + i;
      }
      return j;
    }

    function GetDay(intDay) {
      var DayArray = new Array("Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag");
      return DayArray[intDay];
    }
    function GetMonth(intMonth) {
      var MonthArray = new Array("Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember");
      return MonthArray[intMonth];
    }
    function getDateStrWithDOW() {
      var today = new Date();
      var year = today.getYear();
      if (year < 1000) year += 1900
      var todayStr = GetDay(today.getDay()) + " ";
      todayStr += today.getDate() + ". " + GetMonth(today.getMonth());
      todayStr += " " + year;
      return todayStr;
      }

    this.nameOfTheDay = " " + getDateStrWithDOW() + " ";

    setInterval(function () {
      startTime();
    }, 500);
  },
  methods:{
  openNav: function() {
    alert('test');
    // document.getElementById("myNav").style.height = "100%";
    },
    closeNav: function() {
      //document.getElementById("myNav").style.height = "0%";
    }
  }
}
</script>

<style>

    @import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css");
    @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
    @import "../css/responsive_background.css";
    @import "../css/fullscreennavigation.css";
    
    body {
        height: 100%;
        margin: 0;
        font-family: 'Amatic SC', cursive;
        line-height: normal;
        background-color: gray;
    }

    @media (min-width: 768px) {
        .h-md-100 {
            height: 100vh;
        }
    }

    .btn-round {
        border-radius: 30px;
    }

    .text-cyan {
        color: #35bdff;
    }

    .p-5 {
        padding: 0rem !important;
    }

    .col-md-4 {
        margin-right: auto;
        margin-left: auto;
        padding-bottom: 62.5%;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url("../Images/Music.jpg");
    }

    .col-md-2 {
        padding-right: 0px !important;

    }
</style>

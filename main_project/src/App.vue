<template>
 
  <v-app>
    
    <!-- <v-main>
      <router-view/>

    </v-main> -->
    <v-app>
      <!-- <v-app-bar
        v-if="showTopBar"
        class="px-3"
        color="white"
        flat
        density="compact"
        style="position: fixed; background-image: linear-gradient(to bottom right,rgb(118,76,163),rgb(92,103,211));"
      > -->
      <v-app-bar
        v-if="showTopBar"
        class="px-3"
        color="white"
        flat
        density="compact"
        :style="{position: 'fixed', 'background-image': barimg}"
      >
      <a href="javascript:void(null);"  @click="goToHome">
        <v-avatar size="32">
            <img
              src="/booklogo.png"
              alt="london"
              style="width: 32px; height: 32px; border-radius: 50%;"
            >
          </v-avatar>
      </a>
        <!-- <router-link to="/VisitorPage">
          <v-avatar size="32">
            <img
              src="/booklogo.png"
              alt="london"
              style="width: 32px; height: 32px; border-radius: 50%;"
            >
          </v-avatar>
        </router-link> -->
        

        <span class="text" style="left: 650px; top: 5px; font-size: 25px" display> Rate My:</span>

        <div class="showLogin" v-if="curVerified">

          <!-- <router-link to="/Admin" class="text" style="left: 60%; top: 17px;  font-size: 15px" v-if="curAdmin">Admin Portal</router-link> -->

          <span class="text" style="left: 40px; top: 13px; font-size: 15px" display> {{curSchool}}</span>

          <span class="text" style="right: 50px; top: 13px; font-size: 15px">Logged in as: {{curUsername}}</span>

        </div>    
        
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
  
        <v-tabs
          centered
          
          v-model="tabVal"
        >
          <v-tab
            v-for="link in links"
            :key="link"
            style="color: white !important;"
            @click="changeTab"
            
          >
            {{ link }}
          </v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
  
        <!-- <v-avatar
          class="hidden-sm-and-down"
          color="grey-darken-1"
          size="32"
        ></v-avatar> -->

        <v-menu
          open-on-hover
        >
          <!-- <template v-slot:activator="{ props }">
              <v-icon v-bind="props" style="color: white; float: right; top: 10px;" >mdi-account</v-icon>
          </template> -->
          <template v-slot:activator="{ props }">
            <v-avatar size="32">
              <v-icon v-bind="props" style="color: white; height: 32px; width: 32px; margin: 0px; padding: 0px" >mdi-account</v-icon>
            </v-avatar>
          </template>

          <v-list v-if="curVerified">
            <v-list-item
              v-if="curAdmin"
              router-link :to="'/Admin'"
            >
              <v-list-item-title>{{ 'Admin Portal' }}</v-list-item-title>
            </v-list-item>
            <v-list-item
              router-link :to="'/ProfilE/' + curUser"
            >
              <v-list-item-title>{{ 'Profile' }}</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-on:click="logout"
            >
              <v-list-item-title>{{ 'Log out' }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list v-else>
            <v-list-item
              router-link :to="'/SignUp'"
            >
              <v-list-item-title>{{ 'Sign up' }}</v-list-item-title>
            </v-list-item>
            <v-list-item
              router-link :to="'/login'"
            >
              <v-list-item-title>{{ 'Log in' }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>



      <component class="mt-12" v-bind:is="layout" @top-show="setShowTopBar"></component>
    </v-app>
  </v-app>
</template>

<script>
import ThreeColLayout from './layout/three-columns'
import ConstrainedLayout from './layout/constrained-columns'
import OneColLayout from './layout/one-column'
import DiningColLayout from './layout/three-columns-dining'
import ClubColLayout from './layout/three-columns-clubs'
//import SwitchLayout from './components/SwitchLayout.vue';

export default {
  name: 'App',

  data: () => ({
    //
    showTopBar: false,
    links: [
      'Courses',
      'Dining Halls',
      'Clubs',
    ],
    curVerified: localStorage.getItem('loggedIn'),
    curUsername: localStorage.getItem('username'),
    curSchool: localStorage.getItem("schoolName"),
    curUser: localStorage.getItem("userID"),
    curAdmin: localStorage.getItem("isAdmin") === 'true',

    barimg: 'linear-gradient(to bottom right,rgb(118,76,163),rgb(92,103,211))',
    tabVal: '',
  }),
  methods: {
    setShowTopBar(show, inputTab) {
      //CREATE ANOTHER PARAMETER THAT CHANGES TAB
  
      var temp = inputTab;
      this.curVerified = localStorage.getItem('loggedIn'),
      this.curUsername = localStorage.getItem('username'),
      this.curSchool = localStorage.getItem("schoolName"),
      this.curUser = localStorage.getItem("userID"),
      this.curAdmin = localStorage.getItem("isAdmin") === 'true',
      this.showTopBar = show;

      if (this.$route.name === 'VisitorPage') {
        temp = 0;
      } else if(this.$route.name === 'DiningVisitorPage') {
        temp = 1;
      } else if(this.$route.name === 'ClubVisitorPage') {
        temp = 2;
      }
      
      if (temp != -1){
        this.tabVal = temp;
        if(this.tabVal == 1) {
          this.barimg = 'linear-gradient(to bottom right,rgb(31,211,85),rgb(70,175,152))';
          localStorage.setItem('reviewType', 'dining');
        } else if (this.tabVal == 2) {
          this.barimg = 'linear-gradient(to bottom right,rgb(229,57,30),rgb(210,144,37))';
          localStorage.setItem('reviewType', 'club');
        } else {
          this.barimg = 'linear-gradient(to bottom right,rgb(118,76,163),rgb(92,103,211))';
          localStorage.setItem('reviewType', 'course');
        }
      }
    },
    logout() {
      localStorage.clear();
      if (this.$route.name === 'DiningVisitorPage' || this.$route.name === 'VisitorPage' || this.$route.name === 'ClubVisitorPage') {
        this.$router.go();
      }
      this.goToHome();
    },
    changeTab() {
      //console.log(this.tabVal);
      if(this.tabVal == 1) {
        this.barimg = 'linear-gradient(to bottom right,rgb(31,211,85),rgb(70,175,152))';
        localStorage.setItem('reviewType', 'dining');
        //this.$router.go();
        this.$router.push("/DiningVisitorPage");
      } else if (this.tabVal == 2) {
        this.barimg = 'linear-gradient(to bottom right,rgb(229,57,30),rgb(210,144,37))';
        localStorage.setItem('reviewType', 'club');
        //this.$router.go();
        this.$router.push("/ClubVisitorPage");
      } else {
        this.barimg = 'linear-gradient(to bottom right,rgb(118,76,163),rgb(92,103,211))';
        localStorage.setItem('reviewType', 'course');
        //this.$router.go();
        this.$router.push("/VisitorPage");
      }
    },
    goToHome() {
      if(this.tabVal == 1) {
        this.barimg = 'linear-gradient(to bottom right,rgb(31,211,85),rgb(70,175,152))';
        localStorage.setItem('reviewType', 'dining');
        //this.$router.go();
        this.$router.push("/DiningVisitorPage");
      } else if (this.tabVal == 2) {
        this.barimg = 'linear-gradient(to bottom right,rgb(229,57,30),rgb(210,144,37))';
        localStorage.setItem('reviewType', 'club');
        //this.$router.go();
        this.$router.push("/ClubVisitorPage");
      } else {
        this.barimg = 'linear-gradient(to bottom right,rgb(118,76,163),rgb(92,103,211))';
        localStorage.setItem('reviewType', 'course');
        //this.$router.go();
        this.$router.push("/VisitorPage");
      }
    }
  },
  created() {
    if (localStorage.getItem("reviewType") == 'dining'){
      this.tabVal = 1;
      this.barimg = 'linear-gradient(to bottom right,rgb(31,211,85),rgb(70,175,152))';
      //this.$router.push("/DiningVisitorPage");
    } else if (localStorage.getItem("reviewType") == 'course'){
      this.tabVal = 0;
      this.barimg = 'linear-gradient(to bottom right,rgb(118,76,163),rgb(92,103,211))';
      //this.$router.push("/VisitorPage");
    } else {
      this.tabVal = 2;
      this.barimg = 'linear-gradient(to bottom right,rgb(229,57,30),rgb(210,144,37))';
    }
    
  },
  computed: {
    layout(){
      return this.$store.state.layout;
    }
  },
  components: {
    "baseLayout": ThreeColLayout,
    "constrainedLayout": ConstrainedLayout,
    "oneLayout": OneColLayout,
    "baseDiningLayout": DiningColLayout,
    "baseClubLayout": ClubColLayout,
}
}
</script>

<style lang="scss">
label {
  z-index: 10;
}

.votecircle .v-progress-circular .v-progress-circular__underlay{
  stroke: rgba(255,0,0,.7) !important;
  z-index: 1;
}
.votecircle .v-progress-circular .v-progress-circular__content{
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
}

</style>


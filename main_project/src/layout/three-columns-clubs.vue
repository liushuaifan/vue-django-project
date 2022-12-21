<template>
    <v-app id="inspire">
      <v-main class="bg-grey-lighten-3">
        <v-card class="float-left ma-5" style="position: fixed" rounded="lg" >
          <v-layout>
            <v-navigation-drawer
              permanent
            >
              <v-list
                density="compact"
                nav
              >
                <v-list-item @click="goHome" prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
                <v-list-item @click="goCreateReview" prepend-icon="mdi-pencil" title="Create Review" value="createReview" active-color="deep-orange darken-1"></v-list-item>
                <v-list-item @click="goProfile" prepend-icon="mdi-account" title="My Profile" value="myProfile" active-color="deep-orange darken-1"></v-list-item>
                <v-list-item v-if="!unreadMail" @click="goMessages" prepend-icon="mdi-email" title="Inbox" value="inbox" active-color="deep-orange darken-1"></v-list-item>
                <v-list-item v-else @click="goMessages" prepend-icon="mdi-email-alert" title="Inbox" value="inbox" active-color="deep-orange darken-1"></v-list-item>
                              </v-list>
                <div>
                  <v-btn
                    class="float-left ml-2"
                    icon="mdi-magnify"
                    size="small"
                    variant="flat"
                    @click="searchQuery"
                  ></v-btn>
                  <v-autocomplete
                    class="float-right"
                    style="height: 40px !important; width: 190px"
                    v-model="search"
                    :items="clubs"
                    item-title="name"
                    item-value="id"
                    :menu-props='{ nudgeTop: 5, maxHeight: 220}'
                    @keydown="searchQuery"
                    chips
                    multiple
                    return-object
                    density="compact"
                  >    
                  </v-autocomplete>
                  
                </div>
                

            </v-navigation-drawer>
            <v-main style="height: 275px"></v-main>
          </v-layout>
        </v-card>
        
        <v-card class="w-75" rounded="lg" style="margin-top: 20px; margin-left: 20%;">
          <v-sheet
            min-height="100vh"
            rounded="lg"
          >
            
            <router-view @show-top="passTop"></router-view>
            
          </v-sheet>
        </v-card>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import axios from "axios";
    export default {
      data: () => ({
        links: [
          'Dashboard',
          'Messages',
          'Profile',
          'Updates',
        ],
        tabVal: '',
        search: null,
        clubs:[],
        unreadMail: false,
        curVerified: localStorage.getItem('loggedIn'),
        curUsername: localStorage.getItem('username'),
        curSchool: localStorage.getItem("schoolID"),
        curUser: localStorage.getItem("userID"),
        curAdmin: localStorage.getItem("isAdmin") === 'true',
      }),
      methods: {
        async getData() {
          try {
            var qClubs = "";
            if(this.curSchool){
              qClubs = `http://18.191.156.68:8000/api/clubs/clubs/?school=` + this.curSchool;
            } else {
              qClubs = `http://18.191.156.68:8000/api/clubs/clubs/`;
            }

            const resClubs = await axios.get(qClubs);

            this.clubs = Array.from(resClubs.data).sort(function (a, b) {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());});
              
            if( localStorage.getItem('loggedIn')){
              const userMessages = await axios.get(`http://18.191.156.68:8000/api/messages/?user=` + this.curUser);
              this.unreadMail = userMessages.data.length > 0;

            } else {
              this.unreadMail = false;
            }
          } catch (error) {
              // log the error
              console.log(error);
          }
        },
        // changeTab(){
        //   console.log("changed", this.tabVal);
        //   if(this.tabVal == 2){
        //     this.$store.dispatch("setLayout", "constrainedLayout");
        //     this.$router.push('/Test');
        //   } else {
        //     this.$router.push('/');
        //   }
        // },
        passTop(show){
          console.log("double poggo", show);
          this.$emit('topShow', show, 2);
        },
        goHome(){
          this.$router.push('/ClubVisitorPage');
        },
        goCreateReview(){
          this.$router.push('/CreateClubReview');
        },
        goProfile(){
          this.$router.push('/Profile/' + this.curUser);
        },
        goMessages(){
          this.$router.push('/Messages');
        },
        searchQuery(event){
          if(this.search && (!event.key || (event.key === 'Enter'))) {
            localStorage.setItem('clubSearchQuery', JSON.stringify(this.search));
            if (this.$route.name === 'ClubSearchResults') {
              this.$router.go();
            } 
            else{
              this.$router.push("/ClubSearchResults");
            }
          }
        },
      },
      created(){
        this.getData();
      },
      emits: ['topShow'],
    }
  </script>


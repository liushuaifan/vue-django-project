<template>
    <v-app id="inspire">
      <!-- <v-app-bar flat>
        <v-container class="fill-height d-flex align-center">
          <v-avatar
            class="mr-10 ml-4"
            color="grey-darken-1"
            size="32"
          ></v-avatar>
          
          <v-btn
            v-for="link in links"
            :key="link"
            variant="text"
            @click="changeTab(link)"
          >
            {{ link }}
          </v-btn>
  
          <v-spacer></v-spacer>
  
          <v-responsive max-width="260">
            <v-text-field
              density="compact"
              hide-details
              variant="solo"
            ></v-text-field>
          </v-responsive>
        </v-container>
      </v-app-bar> -->
      <v-app-bar
        class="px-3"
        color="white"
        flat
        density="compact"
      >
        <v-avatar
          color="grey-darken-1"
          size="32"
        ></v-avatar>
        
        <v-spacer></v-spacer>
  
        <v-tabs
          centered
          color="grey-darken-2"
          v-model="tabVal"
        >
          <v-tab
            v-for="link in links"
            :key="link"
            @click="changeTab"
            
          >
            {{ link }}
          </v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
  
        <v-avatar
          class="hidden-sm-and-down"
          color="grey-darken-1"
          size="32"
        ></v-avatar>
      </v-app-bar>
  
      <v-main class="bg-grey-lighten-3">
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-sheet rounded="lg">
                <v-list rounded="lg">
                  <v-list-item
                    v-for="n in 5"
                    :key="n"
                    link
                  >
                    <v-list-item-title>
                      List Item {{ n }}
                    </v-list-item-title>
                  </v-list-item>
  
                  <v-divider class="my-2"></v-divider>
  
                  <v-list-item
                    link
                    color="grey-lighten-4"
                  >
                    <v-list-item-title>
                      Refresh
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-sheet>
            </v-col>
  
            <v-col>
              <v-sheet
                min-height="70vh"
                rounded="lg"
              >
                <!--  -->
                <router-view></router-view>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
    export default {
      data: () => ({
        
        links: [
          'Dashboard',
          'Messages',
          'Profile',
          'Updates',
        ],
        tabVal: 2,
      }),
      methods: {
        changeTab(){
          console.log("changed", this.tabVal);
          if(this.tabVal != 2){
            //store tab value in localStorage
            this.$store.dispatch("setLayout", "baseLayout");
            this.$router.push('/');
          } 
          // else {
          //   this.$router.push('/');
          // }
        }
      }
    }
  </script>
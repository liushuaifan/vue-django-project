<template>
    <v-app id="inspire">
  
      <v-main class="bg-grey-lighten-3">
        <v-sheet
        min-height="70vh"
        rounded="lg"
        >
        
        <router-view @show-top="passTop"></router-view>
        
        </v-sheet>
      </v-main>
    </v-app>
  </template>
  
  <script>
    export default {
      data: () => ({
        //
      }),
      methods: {
        passTop(show){
          this.$emit('topShow', show, -1);
        }
      },
      created() {
        console.log("Second setting one layout");
      },
      emits: ['topShow'],
    }
  </script>
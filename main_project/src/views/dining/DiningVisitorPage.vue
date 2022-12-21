<template>
  <div class="backGround">
    <img src="/dining.jpg" style="border: none; padding: 0px; width: 100%; height: 700px; z-index: -10;"  alt="london"/>
  </div>
  
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>

  <div class="control"> 

    <div class="searchbar"> 
      <v-autocomplete
        v-model="search"
        :items="dining_halls"
        item-title="name"
        item-value="id"
        placeholder="search for dining halls"
        :menu-props='{ nudgeTop: 5,maxHeight: 220}'
        @keydown="searchQuery"
        dense
        chips
        multiple
        variant="solo"
        label="Search Dining Halls"
        style="position: absolute; width: 110%; min-width: 300px; height: 30%"
        return-object
      >         
      </v-autocomplete>
      <v-btn
        elevation="2" v-on:click="searchQuery" style="position: absolute; margin-left: 280px; font-size: 15px; top: 8px; width: 105px; text-decoration: none; position: absolute; left:70%;">Search
      </v-btn>
    </div>
  </div>

  <br>
  <v-row class="justify-center" style="position: absolute; top: 300px; left: 30%">
    <v-col>
      <v-btn
        class="ma-2"
        v-if="curVerified"
        router-link to="/CreateDiningReview"
        dark
      >
        <v-icon
          dark
          left
        >
          mdi-pencil
        </v-icon>Create Review
      </v-btn>
    </v-col>

    <v-col>
      <v-btn
        class="ma-2"
        v-if="curVerified"
        router-link :to="'/ProfilE/' + curUser"
        dark
      >
        <v-icon
          dark
          left
        >
          mdi-account
        </v-icon>Profile
      </v-btn>
    </v-col>

    <v-col>
      <v-btn
        class="ma-2"
        router-link to="/DiningReview/1"
        dark
      >
        <v-icon
          dark
          left
        >
          mdi-note-text-outline
        </v-icon>Sample Review
    </v-btn>
    </v-col>
  </v-row>

</template>


<script>
import axios from "axios";
export default{
    name:'DiningVisitor',
    data(){
        return{
            search:null,
            searchresult: [],
            dining_halls: [],
            curVerified: localStorage.getItem('loggedIn'),
            curUsername: localStorage.getItem('username'),
            curSchool: localStorage.getItem("schoolID"),
            curUser: localStorage.getItem("userID"),
            curAdmin: localStorage.getItem("isAdmin") === 'true',
            professor_list:new Set(),
            showit:false,
            reviews1:[]
        }
    },
    methods: {
      async getData() {
          try {
              var qDiningHalls = "";
              if(this.curSchool){
                qDiningHalls = `http://18.191.156.68:8000/api/dining/dining_halls/?school=` + this.curSchool;
              } else {
                qDiningHalls = `http://18.191.156.68:8000/api/dining/dining_halls/`;
              }

              const resDiningHalls = await axios.get(qDiningHalls);

              this.dining_halls = Array.from(resDiningHalls.data).sort(function (a, b) {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());});
          } catch (error) {
              // log the error
              console.log(error);
          }
      },
    searchQuery(event){
      if(this.search && (!event.key || (event.key === 'Enter'))) {
        localStorage.setItem('diningSearchQuery', JSON.stringify(this.search));
        this.$router.push("/DiningSearchResults");
      }
    },
    },
    created() {
        // Fetch tasks on page load
        this.$emit('showTop', true)
        this.$store.dispatch("setLayout", "oneLayout");
        this.getData();
    },
    searchmyclass(){
      return Array.from(this.professor_list);
    },
    emits: ['showTop'],
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.text-center{
  text-align:center;
}
.b-nav{
  text-align: left;
}

.text {
  position: absolute;
  top: 13px;
  text-decoration: none;
  color: white;
  font-weight: 600;
}
.searchbar{
  width: 600px;
  position: absolute;
  left:27%;
}

.center {
  margin-left: auto;
  margin-right: auto;
}
.logo {
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
}
</style>

<style scoped>
.searchbar>>>.v-field__overlay {
  background-color: white;
  opacity: 1.0;
}
.searchbar>>>.v-input__control {
  border: none;
}
.backGround {
  width: 100%;
  z-index: -10;
  float: left;
}
</style>
<template>
  <div class="backGround">
    <img src="/clubs.jpeg" style="border: none; padding: 0px; width: 100%; height: 700px; z-index: -10;"  alt="london"/>
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
        :items="clubs"
        item-title="name"
        item-value="id"
        placeholder="search for clubs"
        :menu-props='{ nudgeTop: 5,maxHeight: 220}'
        @keydown="searchQuery"
        dense
        chips
        multiple
        append-icon
        label="Search Clubs"
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
        router-link to="/CreateClubReview"
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
        router-link to="/ClubReview/1"
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
          clubs: [],
          isShow:true,
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
          var qClubs = "";
          if(this.curSchool){
            qClubs = `http://18.191.156.68:8000/api/clubs/clubs/?school=` + this.curSchool;
          } else {
            qClubs = `http://18.191.156.68:8000/api/clubs/clubs/`;
          }

          const resClubs = await axios.get(qClubs);

          this.clubs = Array.from(resClubs.data).sort(function (a, b) {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());});
          } catch (error) {
              // log the error
              console.log(error);
          }
    },
    searchQuery(event){
      if(this.search && (!event.key || (event.key === 'Enter'))) {
        localStorage.setItem('clubSearchQuery', JSON.stringify(this.search));
        this.$router.push("/ClubSearchResults");
      }
    },
    async submitForm(){
        try {
            // Send a POST request to the API
            const response = await axios.post('http://18.191.156.68:8000/api/professors/', {
                name: this.title
            });
            // Append the returned data to the tasks array
            console.log("pushing " + response.data);
            this.professors.push(response.data);
            // Reset the title and description field values.
            this.title = '';
            this.description = '';
        } catch (error) {
            // Log the error
            console.log(error);
        }
    },
    
    searchClass() {
    console.log(this.search);
    this.searchresult = [];
    
    for (let i in this.reviews) {
        if (this.reviews[i].club_name == this.search) {
          this.searchresult.push(this.reviews[i]);
        }
        //console.log(this.reviews[i].professor_name.replace(" ",""));
        //console.log(this.search.replace(" ",""));
        if (this.reviews[i].club_name.replaceAll(" ","") == this.search.replaceAll(" ","")) {
          this.searchresult.push(this.reviews[i]);
        }
    }
    if(this.searchresult.length>0) this.isShow = false;
    else this.isShow = true;
  },
  goToSearch() {
    // console.log("hello?");
      // if(this.search){
      //   this.$router.push('/SearchResults/' + this.search);
      // } 
      this.reviews1 = []
      for(let i in this.reviews){
        if(this.reviews[i].dining_hall_name.replaceAll(" ","") == this.search.replaceAll(" ","")){
            this.reviews1.push(this.reviews[i]);
        }
      }

      this.showit = true;
  },
  switchToDining() {
    //console.log("dining");
    this.$router.push('/DiningVisitorPage');
  }
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
.center {
margin-left: auto;
margin-right: auto;
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
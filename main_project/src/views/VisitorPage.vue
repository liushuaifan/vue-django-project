<template>
  <div class="backGround">
    <img src="/desk.jpg" style="border: none; padding: 0px; width: 100%; height: 700px; z-index: -10;"  alt="london"/>
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
        :items="autocomplete_list"
        item-title="name"
        item-value="id"
        placeholder="search for courses"
        :menu-props='{ nudgeTop: 5,maxHeight: 220}'
        dense
        chips
        multiple
        class="rounded-xl"
        variant="solo"
        @keydown="searchQuery"
        label="Search Courses"
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
        router-link to="/CreateReview"
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
        router-link to="/ReView/1"
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
  name:'VisiTor',
  data(){
      return{
          search: null,
          searchresult: [],
          professors: [],
          autocomplete_list:[],
          reviews: [],
          isShow:true,
          curVerified: localStorage.getItem('loggedIn'),
          curUsername: localStorage.getItem('username'),
          curSchool: localStorage.getItem("schoolName"),
          curUser: localStorage.getItem("userID"),
          curAdmin: localStorage.getItem("isAdmin") === 'true',
          items: ['foo', 'bar', 'fizz', 'buzz'],
      }
  },
  methods: {
    async getData() {
        try {
            // fetch tasks
            var qCourses = "";
            var qProfessors = "";
            var qDepartments = "";
            if(localStorage.getItem('schoolID')){
              qCourses = `http://18.191.156.68:8000/api/courses/?school=` + localStorage.getItem('schoolID');
              qProfessors = `http://18.191.156.68:8000/api/professors/?school=` + localStorage.getItem('schoolID');
              qDepartments = `http://18.191.156.68:8000/api/departments/?school=` + localStorage.getItem('schoolID');
            } else {
              qCourses = `http://18.191.156.68:8000/api/courses/`;
              qProfessors = `http://18.191.156.68:8000/api/professors/`;
              qDepartments = `http://18.191.156.68:8000/api/departments/`;
            }

            const resCourses = await axios.get(qCourses); //0 = course, 1 = professors, 2 = departments
            const resProfessors = await axios.get(qProfessors);
            const resDepartments = await axios.get(qDepartments);
            
            for (let i in resCourses.data) {
              this.autocomplete_list.push({name: resCourses.data[i].name, id: resCourses.data[i].id, type: 0});
            }

            for (let i in resProfessors.data) {
              this.autocomplete_list.push({name: resProfessors.data[i].name, id: resProfessors.data[i].id, type: 1});
            }

            for (let i in resDepartments.data) {
              this.autocomplete_list.push({name: resDepartments.data[i].name, id: resDepartments.data[i].id, type: 2});
            }

            this.autocomplete_list = Array.from(this.autocomplete_list).sort(function (a, b) {
              return a.name.toLowerCase().localeCompare(b.name.toLowerCase());});
        } catch (error) {
            // log the error
            console.log(error);
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
    searchQuery(event){
      console.log(this.search);
      if(this.search && (!event.key || (event.key === 'Enter'))) {
        localStorage.setItem('searchQuery', JSON.stringify(this.search));
        this.$router.push("/SearchResults");
      }
    },
    searchClass() {
      console.log(this.search);
      this.searchresult = [];
      for (let i in this.reviews) {
          if (this.reviews[i].course_name == this.search) {
            this.searchresult.push(this.reviews[i]);
          }
          //console.log(this.reviews[i].professor_name.replace(" ",""));
          //console.log(this.search.replace(" ",""));
          if (this.reviews[i].professor_name.replaceAll(" ","") == this.search.replaceAll(" ","")) {
            this.searchresult.push(this.reviews[i]);
          }
          if(this.reviews[i].department_name == this.search){
            this.searchresult.push(this.reviews[i]);
          }
      }
      if(this.searchresult.length>0) this.isShow = false;
      else this.isShow = true;
    },
    goToSearch() {
      if(this.search){
        this.$router.push('/SearchResults/' + this.search);
      } 
      
    },
    switchToDining() {
      //console.log("dining");
      this.$router.push('/DiningVisitorPage');
    },
    // logout() {
    //   localStorage.clear();
    //   console.log("HERE!");
    //   this.$router.go();
    // }
  },
  created() {
    this.$emit('showTop', true)
    this.$store.dispatch("setLayout", "oneLayout");
    document.title = "Rate My Courses";
      // Fetch tasks on page load
      this.getData();
      console.log(localStorage.getItem('isActive'));

  },
  searchmyclass(){
    return Array.from(this.autocomplete_list);
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
.topbar {
position: relative;
text-align: center;
font-size: 25px; 
height: 57px; 
background-image: linear-gradient(to bottom right,rgb(118,76,163),rgb(92,103,211));
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
.logo {
border: none;
width: 45px;
height: 45px;
border-radius: 50%;
overflow: hidden;
border: 1px solid #ddd;
border-radius: 4px;
padding: 5px;
width: 50px;
}
.searchbar{
  width: 600px;
  position: absolute;
  left:27%;
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
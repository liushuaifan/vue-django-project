<template>
  <div class="topbar">
   
  <div class="ma-12 pa-12">
    <v-card>
      <v-navigation-drawer
        permanent
        expand-on-hover
      >

      <v-btn
          elevation="2" v-on:click="changeShowCourse" style="font-size: 20px; text-decoration: none; position: relative; height: 33px; width:253px;">Courses
      </v-btn>

      <v-btn
          elevation="2" v-on:click="changeShowProfessor" style="font-size: 20px; text-decoration: none; position: relative; height: 32px; width:253px;">Professor
      </v-btn>
    
      <VRow v-if="showCourse">
      <VCol
           v-for = "review in courseArray" :key="review.id"
          cols="12"
      >

      <VCard>
       <router-link :to="'/SearchResults/' + review" style="text-decoration: none;">{{review}}</router-link>

      </VCard>
      </VCol>
    </VRow>

    <VRow v-if="showProfessor">
      <VCol
           v-for = "professor in professorArray" :key="professor.id"
          cols="12"
      >
      <VCard>
       <router-link :to="('/SearchResults/' + professor)" style="text-decoration: none;">{{professor}}</router-link>
        

      </VCard>
      </VCol>
    </VRow>


  </v-navigation-drawer>
  </v-card>
  </div>
  <router-link to="/VisitorPage" class="closebtn" style="top: 2px; left: 5%">X</router-link>

      <router-link to="/VisitorPage">
        <img class="logo" style="position:absolute; font-size: 12px; top:5px; left:1.5px;" src="/booklogo.png" alt="london"/>
      </router-link>
      <span class="text" style="top: 17px; left: 4.5%;font-size: 12px;color:blue;">Rate My Class</span>
      <router-link to="/courseReview" class="text" style="top: 17px; left: 13%; font-size: 13px; ">Course Evaluation</router-link> 
        <router-link to="/DiningVisitorPage" class="text" style="top: 17px; left:25%; font-size: 13px ">dining experience</router-link> 
       
      <!-- <span class="text" style="right: 230px; font-size: 15px" v-else>School</span> -->
      
      <div class="showLogin" v-if="curVerified">
        <router-link to="/CreateReview" class="text" style="left: 40%; font-size: 20px;">Create Review</router-link> 

    

        <span class="text" style="right: 250px; top: 17px; font-size: 13px" display> {{curSchool}}</span>

        <span class="text" style="right: 140px; top: 17px; font-size: 13px"> {{curUsername}}</span>

        <button v-on:click="logout" class="text" style="top: 17px; right: 65px; font-size: 13px; color: blue;"> Logout </button>
        
        <router-link :to="'/ProfilE/' + curUser">
          <img class="logo" style="position:absolute; top:5px; right:1.5px;" src="/profile.png" alt="lonased"/>
        </router-link> 
      </div>
      <div class="showLogin" v-else>
        <router-link to="/login" class="text" style="right:130px; font-size: 15px">log in</router-link> 
        
        <router-link to="/SignUp" class="text" style="right:70px; font-size: 15px">sign up</router-link> 
      </div>
    
  </div>
  <br>
  <br>
  <br>

     
      <div class="control"> 

        <div class="searchbar"> 
    
        <v-autocomplete
            v-model="search"
            :items="professor_list"
            :menu-props='{ nudgeTop: 5,maxHeight: 125}'
            :no-data-text= "noDataText"
            dense
            filled
            label="Search"
            style="position: absolute; width: 500px; left: 35%;"
          >         
        <!-- <input type="text" class="input" v-model="search"> -->
      </v-autocomplete>
      <v-btn
  elevation="2" v-on:click="goToSearch" style="position: absolute; margin-left: 360px; font-size: 20px; text-decoration: none; position: absolute; left:62%;">Search Class
</v-btn>
    </div>
      
        <!-- <button v-on:click="goToSearch" style="font-size: 20px; text-decoration: none;">Search Class </button>  -->
      </div>
     <br>
      <br>
      <br>
      <br>
    

      <table class="center">
      <tr><td v-for="review in searchresult" :key="review.id">Title: <router-link :to="'/Review/' + review.id">{{review.title}}</router-link>
      <br/>Course: {{review.course_name}}<br/>Professor: {{review.professor_name}}</td></tr>
    </table>
    <!-- <button v-on:click="switchToDining" style="font-size: 20px; text-decoration: none;">Switch to Dining </button>  -->
    <br>
    <br>
    <br>
    <br>

   
    <VRow>
      <VCol
          v-for = "review in reviews" :key="review.id"
          cols="3"
      >
      <VCard>
        Title: <router-link :to="'/Review/' + review.id">{{review.title}}</router-link>
      <br/>Course: {{review.course_name}}<br/>Professor: {{review.professor_name}}<br/>Rating: {{review.rating}}
      </VCard>
      </VCol>
    </VRow>




    <!-- <table class="center">
      <tr><td v-show="isShow"  v-for="review in reviews" :key="review.id">Title: <router-link :to="'/Review/' + review.id">{{review.title}}</router-link>
      <br/>Course: {{review.course_name}}<br/>Professor: {{review.professor_name}}<br/>Rating: {{review.rating}}</td></tr>
    </table> -->


    <!-- <li v-for="professor in professors" :key="professor.id">
                  <p>Professor: {{ professor.name }}</p>
              </li> -->
              <!-- <div class="add_task"> -->
      <!-- <form v-on:submit.prevent="submitForm">
          <div class="form-group">
              <label for="title">Professor Name</label>
              <input type="text" class="form-control" id="title" v-model="title">
          </div>
          <div class="form-group">
              <label for="description">Professor Department</label>
              <textarea class="form-control" id="description" v-model="description"></textarea>
          </div>
          <div class="form-group">
              <button type="submit">Add Prof</button>
          </div>
      </form> -->
    <!-- </div> -->
    <br>
    <br>
    <hr>
  
  <!-- <router-link to="/ReView" style="text-decoration: none;">
     how to nagivate website
  </router-link>  -->
  <span style="padding-right:200px"></span>  
  <router-link to="/ReView/1" style="text-decoration: none;">
     sample review
  </router-link> 
  <span style="padding-right:200px"></span>  
  <!-- <router-link to="/ReView" style="text-decoration: none;">
     what to expect from website
  </router-link>  -->


</template>


<script>
import axios from "axios";
export default{
  name:'VisiTor',
  
  data(){
      return{
          search:'',
          searchresult: [],
          professors: [],
          professor_list:new Set(),
          reviews: [],
          isShow:true,
          curVerified: localStorage.getItem('loggedIn'),
          curUsername: localStorage.getItem('username'),
          curSchool: localStorage.getItem("schoolName"),
          curUser: localStorage.getItem("userID"),
          showProfessor:false,
          showCourse:true,
          professorArray: new Set(),
          departmentArray: new Set(),
          courseArray: new Set(),

      }
  },
  methods: {
    async getData() {
        try {
            // fetch tasks
            var temp = "";
            if(localStorage.getItem('schoolID')){
              temp = `http://18.191.156.68:8000/api/reviews/?school=` + localStorage.getItem('schoolID');
            } else {
              temp = 'http://18.191.156.68:8000/api/reviews/';
            }
            const res = await axios.get(temp);
            if (res.data.length < 4) {
              this.reviews = res.data;
            } else {
              this.reviews = res.data.slice(0, res.data.length);
            }

            for (let i in res.data) {
              this.professor_list.add(res.data[i].professor_name);
              this.professor_list.add(res.data[i].course_name);
              this.professorArray.add(res.data[i].professor_name);
              this.courseArray.add(res.data[i].course_name);
              this.departmentArray.add(res.data[i].department_name);
              console.log(res.data[i].professor_name);
              

            }

            this.professor_list = Array.from(this.professor_list).sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());});
            this.courseArray = Array.from(this.courseArray).sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());});
            this.professorArray = Array.from(this.professorArray).sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());});

            this.items = [
            { 'item': this.item}]
            console.log(this.item);
            //console.log(this.reviews.length);
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
      //console.log("hello?");
      if(this.search){
        this.$router.push('/SearchResults/' + this.search);
      } 
      
    },
    changeShowCourse(){
      this.showCourse=true; 
      this.showProfessor=false;
    },
    changeShowProfessor(){
      this.showCourse=false; 
      this.showProfessor=true;
    },

    switchToDining() {
      //console.log("dining");
      this.$router.push('/DiningVisitorPage');
    },
    },
    created() {
        // Fetch tasks on page load
        this.getData();
        console.log(this.curUsername);
    }
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
// div1{
//   display:inline;
// }
// html,body{
// margin:0;
// padding:0;
// overflow-x:hidden;
// }
// body{
// background-color:rgb(245,245,245);
// }
// img {
// border: 1px solid #ddd;
// border-radius: 4px;
// padding: 5px;
// width: 50px;
// }
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
// table, th, td {
// border: 1px solid black;
// border-collapse: collapse;
// font-size: 25px;
// }
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

.searchbar {
  width: 600px;
  position: absolute;
  left:27%;
}
.closebtn {
  position: fixed;
  top:0%;
  margin-left: 190px;
  border: 1px solid black;
  border-radius: 2px;
  text-decoration: none;
  height: 30px;
  width: 30px;
  font-size: 20px;
}

</style>
<style lang="scss" scoped>
input[type=text] {
  border: 1px solid black;
  border-radius: 2px;
}
</style>
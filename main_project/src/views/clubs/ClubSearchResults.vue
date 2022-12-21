<template>
    
    <div  style="border-bottom: 1px solid grey; height: 100px; margin-top: 20px; margin-left: 5px; margin-right: 25px; padding-left: 10px; text-align: left; font-size: 30px">
        <u>Search:</u> {{querytitle}}
    </div>
    <div class="text1">
      
        <br>
        <br>
        <div style="position: relative; width: 350px; font-size: 15px">
          <span style="font-size: 60px; font-weight: 900;">
            {{searchscoreOverall}}
          </span>
          <span style="font-size: 23px">/ 5</span>
          <br>
          Overall Quality Based on {{reviews.length}}  ratings
          
          <div class="chart1" style="position: absolute; top: -46px; margin-left: 350px;">
            <div  v-if="showplot" class="echart" id="mychart" :style="myChartStyle"></div>
          </div>
        </div>

      <div style="position: absolute; top: 130px; right: 10%;">
          
          <span style="font-size: 40px; font-weight: 900;">
            {{searchscoreActivity}}
          </span>
          <span style="font-size: 17px">/ 5</span>
          <br/>
          Average Activity Score

          <br/>
          <br/>
          
          <span style="font-size: 40px; font-weight: 900;">
            {{searchscoreOrganization}}
          </span>
          <span style="font-size: 17px">/ 5</span>
          <br/>
          Average Organization Score
        <!-- {{ratingOne}}
        {{ratingTwo}}
        {{ratingThree}}
        {{ratingFour}}
        {{ratingFive}} -->
      </div>

      <!-- <Bar
      
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  /> -->

      </div>

      
  <!-- <div style="text-align: center; font-size: 30px;">       -->


   
        <!-- <table class="center">
        <tr><td v-for="review in searchresult" :key="review.id">Title: <router-link :to="'/Review/' + review.id">{{review.title}}</router-link>
        <br/>Course: {{review.course_name}}<br/>Professor: {{review.professor_name}}</td></tr>
      </table> -->
      <br>
      <div style="position: relative; left: 380px; margin-bottom: 20px;">
        <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
              >
                Sort by
              </v-btn>
            </template>
            <v-list>
                <v-list-item
                  @click="scoreSort"
                  >
                    <v-list-item-title>{{ 'Review Score' }}</v-list-item-title>
                </v-list-item>
                <v-list-item
                  @click="ratingSort"
                  >
                    <v-list-item-title>{{ 'Rating' }}</v-list-item-title>
                </v-list-item>
                <v-list-item
                  @click="dateSort"
                >
                  <v-list-item-title>{{ 'Date Posted' }}</v-list-item-title>
                </v-list-item>
            </v-list>
          </v-menu>
      </div>
      <br/>
     
        <VRow style="margin-left: 10px;" class="justify-center">
          <!-- v-for="row in numRows" v-bind:key="row.id" -->
          
        <VCol
          
          v-for="review in sortedArray" v-bind:key="review.id"
          cols="10"
      >
      <VCard 
        router-link :to="'/ClubReview/' +  review.id"
        class="pa-3"
      >
      <v-container>
        <v-row no-gutters>
          <v-col>
            <p class="text-left text-h5 font-weight-bold text-decoration-underline" align-start>Title: {{review.title}}</p>
            <p class="text-left" align-self="center">Club: {{review.club_name}}</p>
          </v-col>

          <v-col align-self="center">
            <p class="text-center text-subtitle-1 font-weight-regular">Club Rating</p>
            <v-rating
              class="pa-2 ma-2"
              v-model="review.rating"
              empty-icon="mdi-circle-outline"
              full-icon="mdi-circle"
              color="deep-purple accent-2"
              size="small"
              readonly
            ></v-rating>
          </v-col>

          <v-col>
            <p class="text-right text-caption" align-start>Posted {{review.post_date}}</p>
            <br/>
            <p class="text-center text-subtitle-1 font-weight-regular" align-self="center">Review Score: {{review.vote_score}}</p>
          </v-col>
        </v-row>
      </v-container>
      <!-- Title: {{review.title}}
      <span style="font-size: 21px; position:absolute; left:10px">Course Rating:</span> 
      <v-rating
        class="pa-2 ma-2"
        v-model="review.rating"
        empty-icon="mdi-circle-outline"
        full-icon="mdi-circle"
        color="deep-purple accent-2"
        size="60"
        readonly
      ></v-rating>
      <br>Course: {{review.course_name}}<br>Professor: {{review.professor_name}}
      <span style="font-size: 21px; position:absolute; left:10px">Review Score: {{review.vote_score}}</span>  -->
       
            
      </VCard>
      </VCol>
    </VRow>

    <!-- <v-container class="bg-surface-variant">
      <v-row no-gutters>
        <v-col
          v-for="n in 10"
          :key="n"
          cols="12"
          sm="4"
        >
          <v-sheet class="ma-2 pa-2">
            One of three columns
          </v-sheet>
        </v-col>
      </v-row>
    </v-container> -->

      <br>
      <br>
      
    
      <!-- <div class="d-flex justify-space-between">
        <v-btn @click="scoreSort"> {{scoreSortText}}</v-btn>
        <v-btn @click="ratingSort"> {{ratingSortText}}</v-btn>
        <v-btn @click="diffSort"> {{diffSortText}}</v-btn>
        <v-btn @click="workSort"> {{workSortText}}</v-btn>
      </div> -->
</template>


<script>
import axios from "axios";
//import { Bar } from 'vue-chartjs'
//import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import * as echarts from 'echarts';

//ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default{
    name:'SearchResults',
    //components: { Bar },
    
    data(){
        return{
            searchInput:'',
            sortMethod: '',
            imgsrc:'https://res.cloudinary.com/dj9h8c4dc/image/upload/v1670271098/cloudinary-demo/oeg7iwjrf08lnadmyud2.jpg',
            scoreSortText: 'Sort by Review Score',
            diffSortText: 'Sort by  Difficulty',
            workSortText: 'Sort by Workload',
            ratingSortText: 'Sort by Overall Rating',
            search:'',
            query:'',
            querytitle: '',
            otherSearch:'',
            searchresult: [],
            professors: [],
            reviews: [],
            isShow:true,
            searchscoreOverall: 0,
            searchscoreActivity: 0,
            searchscoreOrganization: 0,
            curVerified: localStorage.getItem('loggedIn'),
            curUsername: localStorage.getItem('username'),
            curSchool: localStorage.getItem("schoolName"),
            curUser: localStorage.getItem("userID"),
            curAdmin: localStorage.getItem("isAdmin") === 'true',
            numRows: 0,
            numCols: 5,
            numColRem: 0,
            professor_list:new Set(),
            headers: [
              { text: '', value: 'goToReview', sortable: false },
              {
                text: 'Title',
                align: 'start',
                value: 'title'
              },
              { text: 'Course', value: 'course' },
              { text: 'Score', value: 'score' },
              { text: 'Course Rating', value: 'rating' },
              { text: 'Professor', value: 'professor' },
              { text: 'Semester Taken', value: 'semTaken' },
            ],
            ratingOne:0,
            ratingTwo:0,
            ratingThree:0,
            ratingFour:0,
            ratingFive:0,
      xData: [ 'Poor', 'Bad', 'Okay', 'Good', 'Excellent'],
      yData: [this.ratingOne, this.ratingTwo, this.ratingThree,this.ratingFour,this.ratingFive],
      myChartStyle: { float: "right", width: "100%", height: "400px" } ,
      showplot:true,
      chartOptions: {
        responsive: false
      }
      
        }
    },
    mounted() {
      this.initEcharts();
  },
    watch: {
      search: 'searchClass',
      yData: 'initEcharts'
    },
    methods: {
      initEcharts() {
      // 基本柱状图
      const option = {
        grid: {
          top: "0%",
          left: "18%",
          bottom: "30%",
        },
        xAxis: {
          show: false
        },
        yAxis: [
            {
            data: this.xData,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#000000"
            }
          },
          {
            data: this.yData,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#000000"
            }
          }
        ],
        series: [
          {
            type: "bar", //形状为柱状图
            data: this.yData,
            itemStyle: {
              barBorderRadius: 20
            },
            
            barWidth: 10,
          }
        ]
      };
      const myChart = echarts.init(document.getElementById("mychart"));
      myChart.setOption(option);
      //随着屏幕大小调节图表
   
    },
      async getData() {
          try {
              var temp = "";
              if (!this.query){
                if(localStorage.getItem('schoolID')){
                  temp = `http://18.191.156.68:8000/api/clubs/reviews/?is_active=1&school=` + localStorage.getItem('schoolID');
                } else {
                  temp = 'http://18.191.156.68:8000/api/clubs/reviews/?is_active=1';
                }
              } else {
                var clubs = ""
                
                this.query.forEach(q => {
                  this.querytitle += (", " + q.name);
                  clubs += ("," + q.id);
                });
                this.querytitle = this.querytitle.slice(1);
                if(localStorage.getItem('schoolID')){
                  temp = `http://18.191.156.68:8000/api/clubs/reviews/?is_active=1&school=` + localStorage.getItem('schoolID') + '&clubs=' + clubs;
                } else {
                  temp = 'http://18.191.156.68:8000/api/dining/reviews/?is_active=1&clubs=' + clubs;
                }
                
              }

              const res = await axios.get(temp);
              this.reviews = res.data;
              this.reviews.forEach(review => {
                this.searchscoreOverall += review["rating"];
                this.searchscoreActivity += review["activity"];
                this.searchscoreOrganization += review["organization"];

                if(review["rating"]==1){
                  this.ratingOne++;
                } else if(review["rating"]==2){
                  this.ratingTwo++;
                }else if(review["rating"]==3){
                  this.ratingThree++;
                }else if(review["rating"]==4){
                  this.ratingFour++;
                }else if(review["rating"]==5){
                  this.ratingFive++;
                }
              });
              if(this.reviews.length > 0) {
                this.searchscoreOverall = Math.trunc(this.searchscoreOverall * 10/this.reviews.length) / 10;
                this.searchscoreActivity = Math.trunc(this.searchscoreActivity * 10/this.reviews.length) / 10;
                this.searchscoreOrganization = Math.trunc(this.searchscoreOrganization * 10/this.reviews.length) / 10;
              }

              

              this.yData =[this.ratingOne, this.ratingTwo, this.ratingThree,this.ratingFour,this.ratingFive];

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
      updateSearch(event){
        this.search = event;
        console.log(this.search);
      },
      scoreSort(){
        this.sortMethod = 'score';
      },
      diffSort(){
        this.sortMethod = 'diff';
      },
      workSort(){
        this.sortMethod = 'work';
      },
      ratingSort(){
        this.sortMethod = 'rating';
      },
      dateSort(){
        this.sortMethod = 'date';
      },
      switchToDining() {
        //console.log("dining");
        this.$router.push('/DiningVisitorPage');
      },
      },
      computed: {
        sortedArray() {
            let sortsearchresult = this.reviews;
            console.log(sortsearchresult.length)
            console.log('here');
            
            if (this.sortMethod == 'alphabetically') {
              sortsearchresult = sortsearchresult.sort((a,b) => {
                let fa = a.title.toLowerCase(), fb = b.title.toLowerCase();
                if (fa < fb) {
                  return -1
                }
                if (fa > fb) {
                  return 1
                }
                return 0
              });
            } else if (this.sortMethod == 'date') {
              console.log("SORTING BY DATE")
              sortsearchresult = sortsearchresult.sort((a,b) => {
                let fa = a.post_date, fb = b.post_date;
                if (fa < fb) {
                  return 1
                }
                if (fa > fb) {
                  return -1
                }
                return 0
              });
            } else if (this.sortMethod == 'rating') {
              console.log("bro");
              sortsearchresult = sortsearchresult.sort((a,b) => {
                  return b.rating - a.rating;
              });
            } else if (this.sortMethod == 'diff') {
              sortsearchresult = sortsearchresult.sort((a,b) => {
                  return b.difficulty - a.difficulty;
              });
            } else if (this.sortMethod == 'work') {
              sortsearchresult = sortsearchresult.sort((a,b) => {
                  return b.workload - a.workload;
              });
            } else if (this.sortMethod == 'score') {
              sortsearchresult = sortsearchresult.sort((a,b) => {
                  return b.vote_score - a.vote_score;
              });
            } 
            return sortsearchresult;
            
          }
      },
      created() {
        this.$emit('showTop', true)
        this.$store.dispatch("setLayout", "baseClubLayout");
        document.title = "Club Reviews";
        this.query = JSON.parse(localStorage.getItem('clubSearchQuery'));

        this.getData();
      },
      emits: ['showTop'],
}
</script>

<style lang="scss">
.echartDiv{
    width: 50%;
    height: 200px;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.searchbar1{
  width: 300px;
  top: 20px;
  right: 20px;
  position: absolute;
}
.v-field__input{
  background-color: white;
}
.chart1 {
  width: 470px;
  height: 280px;
}
.text1 {
  border-bottom: 1px solid grey;
    margin-left: 25px;
    margin-right: 25px;
    padding-bottom: 100px;
    height: 290px;
}
</style>
<style scoped>
.searchbar1>>>.v-field__overlay {
  background-color: white;
}
.searchbar1>>>.v-input__control {
  border: 1px solid black;
  border-radius: 2px;
}
</style>
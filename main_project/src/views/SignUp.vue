<template>
    <div class="page-sign-up">
        <div class="columns">
            <div class="column is-4 is-offset-4">

                <h1 class="title">Register</h1>
                <div style="width:50%; margin: auto">
                <v-form 
                    @submit.prevent="submitForm"
                    ref="form"
                    v-model="valid"
                >
                    <v-autocomplete
                        label="University"
                        v-model="university"
                        :items="universities"
                        :rules="mandatoryRule"
                        item-title="name"
                        item-value="id"
                        @update:modelValue="uniChange"
                        required
                    ></v-autocomplete>
                    <div v-if="newUni">
                        <label>Enter new University Name</label>
                        <v-text-field
                            :rules="[
                            v => (!!v && this.newUni) || 'Name is required'
                            ]"
                            clearable
                            label="New University"
                            v-model="newUniName"
                        ></v-text-field>
                    </div>
                    <v-text-field 
                        v-model="AreaOfStudy"
                        :rules="mandatoryRule"
                        label="Area of Study"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="Email"
                        :rules="mandatoryRule"
                        label="Email"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="username"
                        :rules="mandatoryRule"
                        label="Username"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        :rules="mandatoryRule"
                        label="Password"
                        type="password"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="password2"
                        :rules="mandatoryRule"
                        label="Confirm Password"
                        type="password"
                        required
                    ></v-text-field>
                    <v-btn class="ma-2" @click="validate">Submit Registration</v-btn>
                    <v-btn @click="goLogin">Go to Login</v-btn>
                </v-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'SignUp',
    data() {
        return {
            username: '',
            password: '',
            password2: '',
            university: '',
            AreaOfStudy:'',
            Email:'',
            errors: [],
            verified:false,
            universities: [],
            universitiemap: new Map(),
            newUni: false,
            newUniName: '',
            mandatoryRule: [v => !!v || 'Field is required'],
        }
    },
    methods: {
        async validate () {
          const { valid } = await this.$refs.form.validate()
          if (valid) {
            this.submitForm()
          }
        },
        async getData() {
            try {
                // fetch tasks
                const res = await axios.get(`http://18.191.156.68:8000/api/schools/`);
                this.universities = res.data;
                this.universities.push({id: "-1", name: "Other"});
                for(let i in this.universities){
                    this.universitiemap.set(this.universities[i].id,this.universities[i].name);
                }
            
            } catch (error) {
                // log the error
                console.log(error);
            }
        },
        async submitForm() {
            this.errors = []
            if (this.university == 0) {
                this.errors.push('university is missing')
            }
            if (this.email === '') {
                this.errors.push('email is missing')
            }
            if (this.AreaOfStudy === '') {
                this.errors.push('area of study is missing')
            }
            if (this.username === '') {
                this.errors.push('The username is missing')
            }
            if (this.password === '') {
                this.errors.push('The password is too short')
            }
            if (this.password !== this.password2) {
                this.errors.push('The passwords don\'t match')
            }
            if (this.errors.length==0) {
                try {
                    // Send a POST request to the API
                    var userActive = true;
                    await axios.post('http://18.191.156.68:8000/api-auth/registration/', {
                        username: this.username,
                        password1: this.password,
                        password2: this.password2,
                        email: this.Email
                    });

                    const response3 = await axios.get('http://18.191.156.68:8000/api/users/');
                    var userID = response3.data[response3.data.length - 1]["id"];
                    if (this.newUni) {
                        this.university = "1";
                        userActive = false;
                        await axios.post('http://18.191.156.68:8000/api/schoolrequests/', {
                            school: this.newUniName,
                            requester: userID
                        });
                    }

                    await axios.post('http://18.191.156.68:8000/api/profiles/', {
                        school: parseInt(this.university),
                        areaOfStudy: this.AreaOfStudy,
                        classesTaken: "No Classes",
                        score: 0,
                        revUser: userID,
                        isActive: userActive
                    });
                    //this.$alert("Hello Vue Simple Alert.");
                    // Append the returned data to the tasks array
                    //console.log("pushing " + response.data);
                    //this.comments.push(response.data);
                    // Reset the title and description field values.
                    this.verified = true;
                    this.errors.push('SignUp successfully')
                    this.$router.push("/login")
                } catch (error) {
                    // Log the error
                    console.log(error);
                }
                
            }
            console.log(this.username+" "+this.University+this.password+" "+this.AreaOfStudy+" "+this.Email)
        },
        uniChange() {
            if(this.university == "-1"){
              this.newUni = true;
            } else {
              this.newUni = false;
            }
        },
        goLogin() {
            this.$router.push("/login")
        }
    },
    created() {
        this.$emit('showTop', false)
        this.$store.dispatch("setLayout", "oneLayout");
        this.getData();
        console.log(this.curUsername);
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

// html,body{
//   margin:0;
//   padding:0;
//   overflow-x:hidden;
// }
// body{
//   background-color:rgb(245,245,245);
// }

// img {
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   padding: 5px;
//   width: 100px;
// }

.text-center{
  text-align:center;
}

.b-nav{
    text-align: left;
}
.input, .select {
  border: 1px solid black;
  height: 23px;
  width: 200px;
  border-radius: 3px;
}

.form-control {
  /* position: relative;
  font-family: Arial; */

  border: 1px solid black;
  height: 23px;
  width: 200px;
  border-radius: 3px;
  }
  

</style>

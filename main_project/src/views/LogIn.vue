<template>
    <div class="page-log-in">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Log in</h1>
                <div style="width:50%; margin: auto">
                <v-form 
                    @submit.prevent="submitForm"
                    ref="form"
                    v-model="valid"
                >
                    <v-text-field
                        v-model="username"
                        :rules="nameRules"
                        label="Username"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="password"
                        :rules="nameRules"
                        label="Password"
                        type="password"
                        required
                    ></v-text-field>

                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>
                    <v-btn elevation="2" type="submit">Log In</v-btn>

                    <v-btn class="ml-2" @click="goRegistration" elevation="2">Register</v-btn>
                </v-form>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'LogIn',
    data() {
        return {
            valid: true,
            username: '',
            password: '',
            errors: [],
            schoolcode: new Map(),
            universities: [],
            universitiemap: new Map(),
            nameRules: [
                v => !!v || 'Field is required'
            ],
        }
    },
    mounted() {
        document.title = 'Log in';
    },
    methods: {
        async validate () {
          const { valid } = await this.$refs.form.validate()

          if (valid) alert('Form is valid')
        },
        async submitForm(){
            try {
                // Send a POST request to the API
            //     const res = await axios.get(`http://18.191.156.68:8000/api/schools/`);
            //   this.universities = res.data;
            //   console.log("j " + this.universities)
            //   for(let i in this.universities){
            //         this.universitiemap.set(this.universities[i].id,this.universities[i].name);
            //   }
                const response = await axios.post('http://18.191.156.68:8000/api-auth/login/', {
                    username: this.username,
                    password: this.password,
                });
                
                console.log(response.data);
                if (response.data.key) {
                    const userIDRes = await axios.get(`http://18.191.156.68:8000/api/users/?username=` + this.username );
                    const userID = userIDRes.data[0]["id"];
                   
                    const profileIDRes = await axios.get(`http://18.191.156.68:8000/api/profiles/?id=` + userID );
                    
                    localStorage.setItem('userID', userID);
                    localStorage.setItem('schoolID', profileIDRes.data[0]["school"]);
                    localStorage.setItem('schoolName', profileIDRes.data[0]["school_name"]);
                    localStorage.setItem('isAdmin', userIDRes.data[0]["is_staff"]);
                    localStorage.setItem('token', response.data.key);
                    localStorage.setItem('username', this.username);
                    localStorage.setItem('loggedIn', true);
                    localStorage.setItem('isActive', profileIDRes.data[0]["isActive"])
                    localStorage.setItem('profileID', profileIDRes.data[0]["id"])
                    localStorage.setItem('reviewType', 'course');
                    //console.log('he' + profileIDRes.data[0]["school_name"]);
                    this.$router.push("/VisitorPage");
                } else {
                    console.log("not logged in");
                }
               
                
            } catch (error) {
                // Log the error
                console.log(error);
                console.log("not logged in");
                window.alert("Unable to log in");
            }
        },
        showerror(){
            console.log(localStorage.username)
        },
        goRegistration(){
            this.$router.push("/SignUp");   
        },
        },
        created() {
            console.log("Setting one layout");
            this.$emit('showTop', false)
            this.$store.dispatch("setLayout", "oneLayout");
            localStorage.clear();
        },
        emits: ['showTop'],
    }

</script>
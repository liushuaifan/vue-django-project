<template>
    <div class="title">
        <span style="margin 0 auto">Messages</span>
    </div>
    <v-container v-if="messages.length > 0" class="pa-0">
        <v-row justify="center">
            <v-col cols="4">
                <v-card class="mx-auto float-left" max-width="400">
                    <v-list lines="two" density="comfortable">
                        <v-list-subheader>Inbox</v-list-subheader>
                        <v-list-item
                            v-for="message in messages"
                            :key="message.id"
                            link
                            @click="selMessage = message; expand = true;"
                        >
                            <v-list-item-content>
                                <v-list-item-title><div class="float-left">{{ message.title }}</div> - <div class="float-right">{{ message.date }}</div></v-list-item-title>
                                <v-list-item-subtitle>{{ message.text }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
            
            <v-col cols="8">
                <v-scroll-x-transition>
                    <v-card
                        v-show="expand"
                        :title="selMessage.title"
                        :text="selMessage.text"
                    >
                    <v-card-actions class="justify-center">
                        <v-btn
                            variant="tonal"
                            color="red-lighten-2"
                            @click="markRead"
                        >
                            Delete Message
                        </v-btn>
                    </v-card-actions>
                    </v-card>
                </v-scroll-x-transition>
            </v-col>
        </v-row>
    </v-container>
    <h2 v-else><br/>No Messages in Inbox</h2>
    
</template>

<script>
import axios from "axios";

export default{
    name:'MessagesView',
    data(){
        return {
            messages: [],
            selMessage: {},
            expand: false,
            username: localStorage.getItem("username"),
            curVerified: localStorage.getItem('loggedIn'),
            curUsername: localStorage.getItem('username'),
            curSchool: localStorage.getItem("schoolName"),
            curUser: localStorage.getItem("userID")
        }
    },
    methods: {
        async getData(){
            try {
                // fetch tasks
                const userMessages = await axios.get(`http://18.191.156.68:8000/api/messages/?user=` + this.curUser);

                this.messages = userMessages.data;
            } catch (error) {
                // log the error
                console.log(error);
            }
        },
        async markRead(){
            this.expand = false;
            await axios.delete('http://18.191.156.68:8000/api/messages/' + this.selMessage.id + '/');
            this.selMessage = {}
            this.getData();
        }
    },
    created() {
            this.$emit('showTop', true)
            if (localStorage.getItem("reviewType") == 'dining'){
            this.$store.dispatch("setLayout", "baseDiningLayout");
            } else  if (localStorage.getItem("reviewType") == 'course') {
            this.$store.dispatch("setLayout", "baseLayout");
            } else {
            this.$store.dispatch("setLayout", "baseClubLayout");
            }
            document.title = "Messages";
            // Fetch tasks on page load
            if(localStorage.getItem('loggedIn')){
                this.getData();
            } else {
                this.$router.push("/VisitorPage");
            }
        },
        emits: ['showTop'],
}
</script>
<style scoped>
.title {
  text-align: center;
  font-size: 35px;
}
</style>
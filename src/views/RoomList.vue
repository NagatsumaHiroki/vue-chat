
<template>
    <v-app id="inspire">
      <sidebar/>
      <v-app-bar 
        app 
        shrink-on-scroll>


        <v-toolbar-title>ルーム一覧</v-toolbar-title>
        <CreateRoom/>
  
        <v-spacer></v-spacer>
  
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
  
      <v-main>
        <v-container>
          <v-row>
            <v-col v-for="room in rooms" :key="room.id" cols="4">
              <!-- <v-card height="200"></v-card> -->
            
              <router-link :to="{ path:'/chat', query:{room_id: room.id}}">
                <v-avatar
                    color="grey lighten-2"
                    size="128"
                >
                <img
                    :src="room.thumailUrl"
                    alt="alt"
                    v-if="room.thumailUrl"
                >
                </v-avatar>
            </router-link>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import firebase from "@/firebase/firebase";
  import Sidebar from '@/components/layouts/Sidebar'
  import CreateRoom from '@/components/layouts/modal/CreateRoom.vue'
  
  export default {
    components :{
      Sidebar,
      CreateRoom
    },
    data : () => ({
        rooms:[]
    }),
    mounted(){
        this.getRooms();
    },
    methods:{
       async getRooms(){
            console.log('-----pppppp-----');
            this.rooms = [];
            const roomRef = firebase.firestore().collection("rooms");
            const snapshot = await roomRef.get();
            snapshot.docs.map(doc =>{
                const data = {...doc.data()}
                data.id = doc.id
                // console.log('-------ルーム');
                // console.log(doc.data());
                this.rooms.push(data)
            })
        }
    }
  }
  </script>
  
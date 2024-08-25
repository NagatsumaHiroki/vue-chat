<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-sheet color="grey lighten-4" class="pa-4">
      <v-avatar color="info">
        <input
          type="file"
          ref="fileInput"
          accept="image/jpg, image/jpg, image/png"
          style="display: none"
          @change="updateIcon"
        />
        <v-icon dark @click="changeIcon" icon="mdi-account-circle"> </v-icon>

        <img :src="photoUrl"
                alt=""
                @click="changeIcon"
                v-if="photoUrl">
      
      </v-avatar>
      <div class="username">{{ auth && auth.displayName }}</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="[icon, text, to] in links" :key="icon" :to="to" link>
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon> mdi-logout </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import firebase from "@/firebase/firebase";

export default {
  name: "Sidebar",

  data: () => ({
    drawer: null,
    photoUrl: '',
    links: [
      ["mdi-inbox-arrow-down", "Inbox", "/"],
      ["mdi-send", "Send", "/"],
      ["mdi-delete", "Trash", "/"],
      ["mdi-alert-octagon", "Spam", "/"],
    ],
    auth: null,
  }),
  mounted() {
    this.auth = JSON.parse(sessionStorage.getItem("user"));
    console.log('リロード時');
    console.log(this.auth);
    console.log(this.auth.photoURL);

    this.photoUrl = this.auth.photoURL;
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.message = "ログインに成功しました";
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeIcon(){
      console.log('changeIcon');
      this.$refs.fileInput.click();
    },
    updateIcon(){
      console.log('updateIcon');
      const user = this.getAuth();
      if(user){
        sessionStorage.removeItem('user');
        this.$router.push('/login')
      }
      const file = this.$refs.fileInput.files[0];
      const filePath = `user/${file.name}`

      firebase.storage().ref()
      .child(filePath)
      .put(file)
      .then(async snapshot => {
        const photoUrl = await snapshot.ref.getDownloadURL();
        this.updateProfile(photoUrl)
        this.auth.photoURL = photoUrl;
        sessionStorage.setItem('user', JSON.stringify(this.auth));

        this.photoUrl = photoUrl;
      });
    },

    getAuth(){
      firebase.auth().onAuthStateChanged((user) => {
        return user;
      })
    },
    updateProfile(photoUrl){
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          return user.updateProfile({photoURL: photoUrl});
        }
      })
    }
  },
};
</script>

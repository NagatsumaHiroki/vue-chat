<template>
  <v-app id="inspire">
    <v-main>
      <h1>{{ room ? room.name : "" }}</h1>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-subheader>{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="(data, index) in messages">
                  <v-list-item :key="index">
                    <v-list-item-avatar color="grey darken-1">
                      <v-img :src="data.photoURL"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-subtitle class="message">
                        {{ data.message }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="index !== 6"
                    :key="`divider-${index}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-textarea
        v-model="body"
        class="mx-2"
        label="メッセージを送信"
        prepend-icon="mdi-comment"
        rows="3"
        auto-grow
      ></v-textarea>
      <v-btn class="me-4" type="submit" @click="submit" :disabled="invalid">
        submit
      </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "@/firebase/firebase";

export default {
  name: "Chat",

  data: () => ({
    messages: [],
    roomID: "",
    body: "",
    auth: null,
    room: null,
    cards: ["Today"],
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "Inbox"],
      ["mdi-send", "Send"],
      ["mdi-delete", "Trash"],
      ["mdi-alert-octagon", "Spam"],
    ],
  }),
  mounted() {
    this.auth = JSON.parse(sessionStorage.getItem("user"));

    const roomRef = firebase.firestore().collection('rooms').doc(this.roomId);
    console.log('aaaaa');
    roomRef.collection('messages').orderBy('createdAt', "asc")
    .onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        console.log(change.doc.data());
        this.messages.push(change.doc.data())
      })
    })
  },
  async created() {
    this.roomId = this.$route.query.room_id;
    console.log(this.roomId);

    const roomRef = firebase.firestore().collection("rooms").doc(this.roomId);
    const roomDoc = await roomRef.get();
    if (!roomDoc.exists) {
      this.$router.push("/");
    }
    this.room = roomDoc.data();
    console.log("room", this.room);

    // const snapshot = await roomRef
    //   .collection("messages")
    //   .orderBy("createdAt", "asc")
    //   .get();

    // snapshot.forEach((doc) => {
    //   console.log("uuuuuuu");
    //   console.log(doc.data());
    //   this.messages.push(doc.data());
    // });
  },
  methods: {
    clear() {
      this.body = "";
    },
    submit() {
      this.CreateMessage();
    },
    CreateMessage() {
      // this.body = "";

      const roomRef = firebase.firestore().collection("rooms").doc(this.roomId);
      roomRef
        .collection("messages")
        .add({
          message: this.body,
          name: this.auth.displayName,
          photoURL: this.auth.photoURL,
          createdAt: firebase.firestore.Timestamp.now(),
        })
        .then((result) => {
          console.log(result);
          this.body = "";
        })
        .catch((error) => {
          console.log(error);
          alert("メッセージの送信に失敗しました。");
        });
    },
  },
  computed: {
    invalid() {
      if (!this.body) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style scoped>
.message {
  text-align: left;
}
</style>

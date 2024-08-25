<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          チャットルーム作成
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">新規チャットルーム</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  label="ルーム名"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="file"
                  trucate-length="15"
                  accept="image/*"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="OnSubmit"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import firebase from "@/firebase/firebase";

export default {
  data: () => ({
    dialog: false,
    name: "",
    file: null,
  }),
  methods: {
    async OnSubmit() {
      console.log("OnSubmit", this.name, this.file);
      await this.CreateRoomThumail();
      console.log('After thumailUrl', sessionStorage.getItem('thumailUrl'))
      await this.CreateRoom();
    },
    async CreateRoomThumail() {
      const filePath = `room/${this.file.name}`;
      let thumailUrl = "";
      if (this.file) {
        await firebase
          .storage()
          .ref()
          .child(filePath)
          .put(this.file)
          .then(async (snapshot) => {
            console.log('成功');
            thumailUrl = await snapshot.ref.getDownloadURL();
            sessionStorage.setItem('thumailUrl', thumailUrl);
          });
      }
      console.log('終わり');
    },
    async CreateRoom() {
      const roomRef = firebase.firestore().collection("rooms");
      await roomRef.add({
        name: this.name,
        thumailUrl: sessionStorage.getItem('thumailUrl'),
        createdAt: firebase.firestore.Timestamp.now(),
      })
      .then(result =>{
        console.log('成功!!!!!!', result)
        this.dialog = false
      });
    },
  },
};
</script>

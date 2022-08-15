<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      mobile-breakpoint="1024"
      width="400"
    >
      <v-card color="teal darken-1" dark tile height="60" elevation="0">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Room Members
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ users.length }} user in the room
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <v-list subheader>
        <v-list-item
          v-for="({ name }, index) in users"
          :key="`user-${index}`"
          @click.prevent
        >
          <v-list-item-content>
            <v-list-item-title v-text="name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-4">
          <v-btn
            block
            class="blue-grey darken-4 rounded-xl"
            dark
            height="48"
            @click="exit"
          >
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar app color="teal darken-1" dark height="60" elevation="0">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>
        {{ user.room }}
      </v-toolbar-title>
      <div v-if="typingUsers.length" class="chat-typing">
        <p
          v-for="(typingUser, index) in typingUsers"
          :key="`typingUser-${index}`"
          class="chat-typing-user"
        >
          {{ typingUser.name }} is typing...
        </p>
      </div>
    </v-app-bar>
    <v-main>
      <v-container fluid style="height: 100%;" class="chat__body">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "ChatLayout",
  data: () => ({
    drawer: true,
  }),
  computed: {
    ...mapState(["user", "users"]),
    ...mapGetters(["typingUsers"]),
  },
  middleware: "auth",
  created() {
    this.joinRoom(this.user);
  },
  methods: {
    ...mapActions(["joinRoom", "leftRoom"]),
    exit() {
      this.leftRoom();
      this.$router.push("/?message=leftChat");
    },
  },
};
</script>

<style scoped>
.chat__body {
  background-image: url("/bg.png");
  background-repeat: repeat;
}

.chat-typing {
  position: relative;
  display: flex;
  align-items: center;
  height: 30px;
}

.chat-typing p {
  padding-top: 2px;
  margin: 0;
}

.chat-typing-user:not(first-child) {
  margin-left: 15px;
}
</style>

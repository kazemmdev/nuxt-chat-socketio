<template>
  <div class="chat-wrapper">
    <div ref="chat" class="chat">
      <Message
        v-for="(message, index) in messages"
        :key="`message-${index}`"
        :message="message"
        :owner="message.id === user.id"
      />
    </div>
    <div v-if="typingUsers.length" class="chat-typing">
      <p
        v-for="(typingUser, index) in typingUsers"
        :key="`typingUser-${index}`"
        class="chat-typing-user"
      >
        {{ typingUser.name }} is typing...
      </p>
    </div>
    <div class="chat-form">
      <ChatForm />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Message from "@/components/Message";
import ChatForm from "@/components/ChatForm";

export default {
  name: "ChatPage",
  layout: "chat",
  components: {
    Message,
    ChatForm,
  },
  computed: {
    ...mapState(["user", "messages", "users"]),
    ...mapGetters(["typingUsers"]),
  },
  watch: {
    messages() {
      setTimeout(() => {
        if (this.$refs.chat) {
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
        }
      }, 0);
    },
  },
  head() {
    return {
      title: `Room ${this.user.room}`,
    };
  },
};
</script>

<style scoped>
.chat-wrapper {
  height: 100%;
  position: relative;
  overflow: hidden;
}

.chat-form {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0rem;
  height: 60px;
}

@media screen and (min-width: 760px) {
  .chat-form {
    padding: 4rem;
    height: 80px;
  }
}

.chat {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
  color: #000;
}

.chat-typing {
  position: absolute;
  display: flex;
  bottom: 50px;
}

.chat-typing-user:not(first-child) {
  margin-left: 15px;
}

.chat-body {
  background-image: url("/bg.png");
  background-repeat: repeat;
}
</style>

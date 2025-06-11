<template>
  <div class="chatbot-wrapper">
    <div class="chatbot-container" :class="{ 'active': isOpen }">
      <div class="chatbot-header" @click="toggleChat">
        <div class="chatbot-title">
          <!-- <img :src="botIcon" alt="Chatbot" class="bot-icon" /> -->
          <h3>Помічник з курсів</h3>
        </div>
        <div class="chatbot-status">
          <span class="status-dot" :class="{ 'loading': isLoading }"></span>
          <span class="toggle-icon">{{ isOpen ? '×' : '^' }}</span>
        </div>
      </div>
      
      <div v-if="isOpen" class="chatbot-body">
        <div class="messages" ref="messagesContainer">
          <div v-for="(msg, idx) in messages" :key="idx" 
               :class="['message', msg.sender, msg.intent]">
            <div class="message-content">
              <div class="message-text" v-html="formatMessage(msg.text)"></div>
              
              <div v-if="msg.courses && msg.courses.length" class="courses-grid">
                <div v-for="course in msg.courses" :key="course.id" 
                     class="course-card" @click="viewCourse(course)">
                  <img v-if="course.image" :src="course.image" :alt="course.name" />
                  <div class="course-info">
                    <h4>{{ course.name }}</h4>
                    <div class="course-meta">
                      <span class="price">{{ course.price }} грн</span>
                      <span class="duration">{{ course.duration }} год.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="input-area">
          <textarea v-model="userInput" @keyup.enter.exact="sendMessage" 
                   placeholder="Напишіть свій запит..." ref="messageInput"
                   :disabled="isLoading"></textarea>
          <button @click="sendMessage" :disabled="!userInput.trim() || isLoading">
            <span v-if="!isLoading">Надіслати</span>
            <div v-else class="loader"></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
//import botIcon from '@/assets/bot-icon.png';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt({ html: true, linkify: true, typographer: true });
export default {
  data() {
    return {
      isOpen: true,
      userInput: '',
      messages: [
        {
          text: 'Привіт! Я ваш AI-помічник для підбору курсів. Як я можу допомогти?',
          sender: 'bot',
          intent: 'welcome'
        }
      ],
      isLoading: false,
      //botIcon
    };
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$nextTick(() => {
          this.scrollToBottom();
          this.$refs.messageInput.focus();
        });
      }
    },
    formatMessage(markdownText) {
      // 1) декодуємо HTML-сутності, якщо сервер екранує
      //    (якщо не потрібно — пропустіть цей крок)
      const decoded = this.decodeHtml
        ? this.decodeHtml(markdownText)
        : markdownText;
      // 2) рендеримо Markdown у HTML
      return md.render(decoded);
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) container.scrollTop = container.scrollHeight;
      });
    },
    async sendMessage() {
      if (!this.userInput.trim()) return;
      
      this.isLoading = true;
      const userMessage = this.userInput;
      this.userInput = '';
      
      // Додаємо повідомлення користувача
      this.messages.push({
        text: userMessage,
        sender: 'user'
      });
      
      try {
        const response = await this.$http.post('http://localhost:3000/chatbot', { message: userMessage });
        
        // Додаємо відповідь бота
        this.messages.push({
          text: response.data.text,
          sender: 'bot',
          courses: response.data.courses
        });
        
      } catch (error) {
        console.error('Chatbot error:', error);
        this.messages.push({
          text: 'Вибачте, сталася помилка. Будь ласка, спробуйте пізніше.',
          sender: 'bot'
        });
      } finally {
        this.isLoading = false;
        this.scrollToBottom();
      }
    },
    viewCourse(course) {
      this.$router.push(`/course/${course.id}`);
      this.isOpen = false;
    }
  }
};
</script>

<style scoped>
.chatbot-wrapper {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.chatbot-container {
  width: 350px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transform: translateY(100%);
  opacity: 1;
  transition: all 0.3s ease;
}

.chatbot-container.active {
  transform: translateY(0);
  opacity: 1;
}

.chatbot-header {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  padding: 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chatbot-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bot-icon {
  width: 24px;
  height: 24px;
}

.chatbot-status {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4caf50;
}

.status-dot.loading {
  background: #ffc107;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
}

.toggle-icon {
  font-weight: bold;
  font-size: 18px;
}

.chatbot-body {
  height: 400px;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
}

.messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  max-width: 85%;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.message.user {
  align-self: flex-end;
}

.message.bot {
  align-self: flex-start;
}

.message-content {
  padding: 12px 16px;
  border-radius: 18px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.user .message-content {
  background: #e3f2fd;
  border-bottom-right-radius: 4px;
}

.bot .message-content {
  background: white;
  border-bottom-left-radius: 4px;
}

.message-text >>> .highlight {
  background: #fff9c4;
  padding: 2px 4px;
  border-radius: 4px;
}

.courses-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin-top: 10px;
}

.course-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.course-card:hover {
  transform: translateY(-2px);
}

.course-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.course-info {
  padding: 10px;
}

.course-info h4 {
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #333;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
}

.input-area {
  padding: 12px;
  border-top: 1px solid #e0e0e0;
  background: white;
  display: flex;
  gap: 8px;
}

.input-area textarea {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  resize: none;
  min-height: 40px;
  max-height: 120px;
  outline: none;
  font-family: inherit;
}

.input-area textarea:focus {
  border-color: #6e8efb;
}

.input-area button {
  padding: 0 15px;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
}

.input-area button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loader {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .chatbot-wrapper {
    width: 100%;
    bottom: 0;
    right: 0;
  }
  
  .chatbot-container {
    width: 100%;
    border-radius: 0;
  }
  
  .chatbot-body {
    height: 60vh;
  }
}
</style>
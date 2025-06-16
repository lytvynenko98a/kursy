<template>
  <div class="course-details">
    <div class="course-content">
      <div class="course-description">
        <div class="course-header">
          <h2 class="course-title">{{ course.name }}</h2>
          <p class="course-price">Ціна: {{ formattedPrice(course.price) }}</p>
          <p class="course-duration">Тривалість: {{ course.duration }}</p>
          <p class="course-text">{{ course.description }}</p>
          <div class="start-learning">
            <!-- замінили <a> на кнопку, щоб відкривати модалку -->
            <button class="start-button" @click.prevent="openModal">
              Почати навчання
            </button>
          </div>
        </div>
      </div>
      <div class="course-image-container">
        <img :src="course.image" :alt="course.name" class="course-image" />
      </div>
    </div>

    <h3>Список уроків</h3>
    <ul>
      <li
        v-for="lesson in course.lessons"
        :key="lesson.id"
        class="lesson-item"
      >
        {{ lesson.lesson_number }}. {{ lesson.title }}
      </li>
    </ul>

    <!-- Модальний попап -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>Реєстрація на курси</h2>
        <form @submit.prevent="submitForm">
          <label for="name">Ім'я</label>
          <input id="name" type="text" v-model="name" required />

          <label for="email">Електронна пошта</label>
          <input id="email" type="email" v-model="email" required />

          <label for="courses">Виберіть курси</label>
          <select
            id="courses"
            v-model="selectedCourseIds"
            multiple
            size="5"
          >
            <option
              v-for="c in allCourses"
              :key="c.id"
              :value="c.id"
            >
              {{ c.name }} — {{ formattedPrice(c.price) }}
            </option>
          </select>

          <div class="price-list">
      <h3>Ціни обраних курсів</h3>
      <ul>
        <li v-for="c in selectedCourses" :key="c.id">
          {{ c.name }}:
          <span>{{ formattedPrice(c.price) }}</span>
          <span v-if="isPromoValid">
            → {{ formattedPrice(c.price * (1 - serverDiscount)) }}
          </span>
        </li>
      </ul>
      <p>
        Загальна сума:
        <strong>{{ formattedPrice(totalPrice) }}</strong>
        <span v-if="isPromoValid">
          → <strong>{{ formattedPrice(discountedTotal) }}</strong>
        </span>
      </p>
    </div>

    <label for="promo">Промокод компанії</label>
    <input
      id="promo"
      type="text"
      v-model="promoCode"
      placeholder="Введіть промокод"
    />
    <p v-if="promoCode && !isPromoValid" class="invalid">
      Неправильний промокод
    </p>

          <div class="buttons">
            <button type="submit">Надіслати</button>
            <button type="button" @click="closeModal">
              Закрити
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      course: {},
      allCourses: [],
      selectedCourseIds: [],
      name: '',
      email: '',
      promoCode: '',
      serverPromoCode: '',
      serverDiscount: 0,
      showModal: false,
    };
  },
  computed: {
    selectedCourses() {
      return this.allCourses.filter(c =>
        this.selectedCourseIds.includes(c.id)
      );
    },
    totalPrice() {
      return this.selectedCourses.reduce(
        (sum, c) => sum + parseFloat(c.price),
        0
      );
    },
    discountedTotal() {
      return this.totalPrice * (1 - this.serverDiscount);
    },
    // промокод коректний, якщо ввели щось і воно точно співпадає
    isPromoValid() {
      return (
        this.promoCode.trim().toLowerCase() ===
        this.serverPromoCode.trim().toLowerCase()
      );
    },
  },
  methods: {
    formattedPrice(value) {
      return parseFloat(value).toFixed(2) + ' грн';
    },

    openModal() {
      this.showModal = true;
      // переконаємося, що початково вибраний поточний курс
      if (
        this.course.id &&
        !this.selectedCourseIds.includes(this.course.id)
      ) {
        this.selectedCourseIds = [this.course.id];
      }
    },
    closeModal() {
      this.showModal = false;
    },
    submitForm() {
      // тут можна зробити axios.post на свій бекенд
      const payload = {
        name: this.name,
        email: this.email,
        courses: this.selectedCourseIds,
        promo: this.promoCode,
      };
      console.log('Відправляємо на сервер:', payload);
      axios.post('http://localhost:3000/enroll', payload)
        .then(() => {
          alert('Дякуємо! Ваші дані надіслано, чекайте підтвердження по email.');
        })
        .catch(() => {
          alert('Помилка надсилання. Спробуйте пізніше.');
        });
      this.closeModal();
      alert('Дякуємо! Ваші дані надіслано.');
    },
    async fetchPromo() {
      try {
        const { data } = await axios.get('http://localhost:3000/promo');
        this.serverPromoCode = data.code;
        this.serverDiscount = data.discount;
      } catch (e) {
        console.error('GET /promo error:', e);
      }
    },
    fetchCourse() {
      const courseId = Number(this.$route.params.id);
      return axios
        .get(`http://localhost:3000/courses/${courseId}`)
        .then(res => {
          this.course = res.data;
        });
    },
    fetchAllCourses() {
      // звернення до generic-ендпоінту /Courses
      return axios
        .get(`http://localhost:3000/Courses`)
        .then(res => {
          this.allCourses = res.data;
        });
    },
  },
  async mounted() {
    await Promise.all([this.fetchCourse(), this.fetchAllCourses()]);
    await this.fetchPromo();

    if (this.course.id) {
      this.selectedCourseIds = [this.course.id];
    }
  },
};
</script>

<style scoped>
.start-button {
  
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
.start-button:hover {
  opacity: 0.9;
}
.invalid {
  color: red;
  margin-top: 5px;
}
/* Стилі для модалки */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: white;
  padding: 20px 30px;
  border-radius: 5px;
  width: 90%;
  max-width: 600px;
}
.modal h2 {
  margin-top: 0;
}
.modal form {
  display: flex;
  flex-direction: column;
}
.modal form label {
  margin: 10px 0 5px;
}
.modal form input,
.modal form select {
  padding: 8px;
  font-size: 16px;
}
.modal .price-list {
  margin: 15px 0;
  background: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
}
.modal .buttons {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.modal .buttons button {
  margin-left: 10px;
  padding: 8px 16px;
  cursor: pointer;
}

.course-details {
  margin: 120px 20px 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: auto;
    margin-right: auto;max-width: 1300px;
}
.course-header {
  padding: 20px 70px 20px 20px;
  border-radius: 5px;
}
.course-title {
  font-size: 32px;
  color: #333;
  margin-bottom: 10px;
}
.course-text {
  font-size: 18px;
  color: #555;
  line-height: 1.6;
}
.course-price {
  font-size: 18px;
  color: #007bff;
  margin-bottom: 0;
}
.course-content {
  display: flex;
  align-items: center;
  margin-top: 20px;
  text-align: justify;
}
.course-description {
  flex: 1;
}
.course-duration {
  font-size: 18px;
  color: #555;
  margin-bottom: 10px;
}
.course-image-container {
  flex: 1;
  text-align: center;
}
.course-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}
h3 {
    text-align: center;
    font-size: 23px;
    margin: 30px 0;
}
ul {
  list-style-type: none;
  padding: 0 20px;
}
.lesson-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px auto;
  transition: box-shadow 0.3s;
  font-size: 17px;
  width: 750px;
}
.lesson-item:hover {
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
}
</style>

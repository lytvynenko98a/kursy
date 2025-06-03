<template>
  <div class="course-container">
    <h1 class="course-title">Доступні курси</h1>
    <div class="course-list">
      <div
        v-for="(course, index) in courses"
        :key="course.id"
        :class="['course-card', index % 2 === 0 ? 'even' : 'odd']"
        @click="redirectToCourse(course.id)"
      >
        <img :src="course.image" :alt="course.name" class="course-image" />
        <div class="course-details">
          <h2 class="course-name">{{ course.name }}</h2>
          <p class="course-duration">Тривалість {{ course.duration }} год.</p>
          <p class="course-price">Ціна: {{ course.price }} грн</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return { courses: [] };
  },
  mounted() {
    axios
      .get('http://localhost:3000/courses')           // ① через proxy
      .then(({ data }) => {
        this.courses = data;         // ② лишаємо масив
      })
      .catch(console.error);
  },
  methods: {
    redirectToCourse(id) {
      this.$router.push(`/course/${id}`);
    }
  }
};
</script>

  
<style scoped>
.course-container {
  width: 1400px;
  margin: 120px auto 0;
  padding: 0 20px 40px;
  text-align: center;
}
.course-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #169da7;
}
.course-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}
.course-card {
  width: calc(33.33% - 20px);
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  text-align: left;
  background-color: #fff;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex; 
  flex-direction: column;
}
.course-card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  cursor: pointer;

}
.course-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.course-details {
  padding: 20px;
  background-color: #f5f5f5;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}
.course-name {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}
.course-duration {
  font-size: 25px;
  color: #555;
  margin-top: 15px;
  text-align: center;
}
.course-description {
  font-size: 20px;
  color: #666;
  margin-top: 10px;
  line-height: 1.5;
}
.course-price {
  font-size: 25px;
  color: #00bcd4;
  margin-top: 15px;
  text-align: center;
}
</style>
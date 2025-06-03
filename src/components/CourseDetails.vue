<template>
  <div class="course-details">
    
    <div class="course-content">
      <div class="course-description">
        <div class="course-header">
            <h2 class="course-title">{{ course.name }}</h2>
            <p class="course-price">Ціна: {{ course.price }} грн</p>
            <p class="course-duration">Тривалість: {{ course.duration }}</p>
            <p class="course-text">{{ course.description }}</p>
        </div>
      </div>
      <div class="course-image-container">
        <img :src="course.image" :alt="course.name" class="course-image" />
      </div>
    </div>
    <h3>Список уроків</h3>
    <ul>
      <li v-for="lesson in course.lessons" :key="lesson.id" class="lesson-item">
        {{ lesson.lesson_number }}. {{ lesson.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      course: [],
    };
  },
  mounted() {
    const courseId = this.$route.params.id;
    console.log(courseId)
    axios.get(`http://localhost:3000/courses/${courseId}`)
        .then((response) => {
        this.course = response.data;
        console.log('GET Response:', this.course);
        })
        .catch((error) => {
        console.error('GET Error:', error);
        });
    }
};
</script>

<style scoped>
.course-details {
  margin: 120px 20px 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

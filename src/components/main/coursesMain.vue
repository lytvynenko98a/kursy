<template>
    <div class="home-courses">
      <div class="wrapper">
      <h2 class="section-title">Найпопулярніші курси</h2>
      <div class="course-list">
        <div v-for="course in popularCourses" :key="course.id" class="course-card">
          <img :src="course.image" :alt="course.name" class="course-image" />
          <div class="course-details">
            <h3 class="course-name">{{ course.name }}</h3>
            <p class="course-duration">{{ course.duration }}</p>
            <p class="course-description">{{ course.description }}</p>
            <p class="course-price">Ціна: {{ course.price }} грн</p>
          </div>
        </div>
      </div>
      <a href="/courses" class="view-all-link">Переглянути всі курси</a>
    </div>
    </div>
</template>
  
<script>
import axios from 'axios';

  export default {
    data() {
      return {
        popularCourses: [],
      };
    },
    mounted() {
      axios.get('http://localhost:3000/Courses')
        .then((response) => {
          this.popularCourses = response.data.slice(0, 3);
          console.log('GET Response:', this.popularCourses);
        })
        .catch((error) => {
          console.error('GET Error:', error);
        });
    }
  };
</script>
  
<style scoped>
.home-courses {
  padding: 40px 20px;
  text-align: center;
}
.section-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #169da7;
}
.course-list {
  display: flex;
  justify-content: center;
  gap: 20px;
}
.course-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: left;
  background-color: #fff;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  max-width: 350px;
  background-color: #f5f5f5;

}
.course-card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
}
.course-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.course-details {
  padding: 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;

}
.course-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}
.course-duration {
  font-size: 18px;
  color: #555;
  margin-top: 10px;
}
.course-description {
  font-size: 16px;
  color: #666;
  margin-top: 10px;
  line-height: 1.5;
}
.course-price {
  font-size: 20px;
  color: #00bcd4;
  margin-top: 10px;
}
.view-all-link {
  display: inline-block;
  padding: 10px 20px;
  margin-top: 40px;
  background-color: #007BFF;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-size: 20px;
  transition: background-color 0.3s;
}
.view-all-link:hover {
  background-color: #0056b3;
}
</style>
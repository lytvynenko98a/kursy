<template>
    <div class="reviews">
      <h2 class="reviews-title">Відгуки наших студентів</h2>
      <div class="review-list">
        <div class="review-card" v-for="(review, index) in reviews" :key="index">
          <div class="review-rating">
            <span v-for="star in 5" :key="star" :class="['star', star <= review.rating ? 'filled' : '']">★</span>
          </div>
          <p class="review-text">{{ review.comment }}</p>
          <p class="review-author">- {{ review.author }}</p>
        </div>
      </div>
    </div>
</template>
  
<script>
import axios from 'axios';

  export default {
    data() {
      return {
        reviews: [],
      };
    },
    mounted() {
      axios.get('http://localhost:3000/Reviews')
        .then((response) => {
          this.reviews = response.data;
          console.log('GET Response:', this.reviews);
        })
        .catch((error) => {
          console.error('GET Error:', error);
        });
    }
  };
</script>
  
<style scoped>
.reviews {
  text-align: center;
  padding: 40px 0;
}
.reviews-title {
  font-size: 28px;
  color: #169da7;
  margin-top: 0;
  font-weight: bold;
}
.review-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.review-card {
  width: calc(33.33% - 20px);
  padding: 20px;
  margin: 10px;
  text-align: center;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.review-rating {
  font-size: 24px;
  margin-bottom: 10px;
}
.star {
  color: #ffd700;
}
.star.filled {
  color: #ffac00;
}
.review-text {
  font-size: 18px;
  color: #666;
  margin: 10px 0;
}
.review-author {
  font-weight: bold;
  color: #333;
}
</style>
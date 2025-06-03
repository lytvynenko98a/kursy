<template>
  <header class="header">
  <div class="wrapper">
    <div class="logo"><img src="https://images.vexels.com/media/users/3/224169/isolated/preview/dbfe1f493ad01117fa4ec5ba10150e4d-computer-programming-logo.png" alt=""></div>
    <nav class="nav">
      <ul>
        <li><a href="/#">Головна</a></li>
        <li><a href="/teachers">Наші викладачі</a></li>
        <li><a href="/courses">Доступні курси</a></li>
        <li><a href="/calendar">Календар курсів</a></li>
        <li><a href="/contacts">Контакти</a></li>
        <li><a href="/form">Форма зв'язку</a></li>
      </ul>
    </nav>
    <div class="start-learning">
      <a href="/form" class="start-button">Почни навчання</a>
    </div>
  </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderPro',
};
</script>

<style scoped>
.header {
  position: fixed; 
  top: 0; 
  margin: 0 auto;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: white; 
  color: #fff;
  z-index: 1000; 
}
header .wrapper{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1350px;
}
.start-learning {
  display: flex;
  align-items: center;
}
.start-button {
  background-color: #00bcd4;
  color: #fff;
  font-family: 'Arial', sans-serif;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.start-button:hover {
  background-color: #008ba3;
}
.logo img {
  width: 70px;
}
.nav ul {
  list-style: none;
  padding: 0;
  display: flex;
}
.nav li {
  margin-right: 20px;
}
.nav a {
  text-decoration: none;
  color: #75a3a3;
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  transition: color 0.3s;
}
.nav a:hover {
  color: #00bcd4;
}
</style>

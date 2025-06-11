<template>
  <div class="main_cont">
    <div class="cont-container">
        <div class="container-side">
            <p class="container-title__cont">
                Контакти
            </p>
            <div>
                <p class="container-name__cont">Адреса:</p>
                <p class="container-name__desc">вулиця Університетська, 1, кабінет, 810, 8 Поверх<br>
                  Львів, 79000
                </p>
            </div>
            <div>
                <p class="container-name__cont">Графік роботи:</p>
                <p class="container-name__desc">пн.-пт.: 9:00-18:00<br>
                    сб.: 10:00-15:00<br>
                    нд.: вихідний
                </p>
            </div>
            <div class="container-phones__cont">
                <p class="container-name__cont">Контактна інформація:</p>
                <a href="tel:+38 (099) 999-99-99">Тел.: +38 (099) 999-99-99</a>
                <a href="tel:+38 (099) 999-99-99">Факс: +38 (099) 999-99-99</a>
                <a href="mailto:infoIt@gmail.com">Пошта: infoIt@gmail.com</a>
            </div>
        </div>
        <div id="map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.11226975948!2d24.01972177648212!3d49.84034797148226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add717532cff9%3A0x1ea627f45b408179!2sIvan%20Franko%20National%20University%20of%20Lviv!5e0!3m2!1sen!2sua!4v1749590185512!5m2!1sen!2sua" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>        </div>
        </div>
      </div>
</template>
  
<script>

</script>
  
<style>
.main_cont{
  background-color: #f2f2f2;
  padding-top: 120px;
  padding-bottom: 120px;
}
#map {
    height: 500px;
    width: 600px;
}
.marker-icon {
  font-size: 28px;
  color: #008ba3;
}
.cont-container {
  background-color: #f2f2f2;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 50px;
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
}
.container-side {
  width: 30%;
}
.container-title__cont {
  font-size: 26px;
  color: #00bcd4;
  font-weight: bold;
}
.container-name__cont {
  font-weight: bold;
  margin-top: 10px;
  font-size: 18px;
}
.container-name__desc {
    font-size: 18px;
    line-height: 1.5;
}
.container-phones__cont a {
  display: block;
  font-size: 18px;
  margin-top: 5px;
  color: black;
  text-decoration: none;
  transition: color 0.3s;
}
</style>
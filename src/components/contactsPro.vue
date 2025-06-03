<template>
    <div class="cont-container">
        <div class="container-side">
            <p class="container-title__cont">
                Контакти
            </p>
            <div>
                <p class="container-name__cont">Адреса:</p>
                <p class="container-name__desc">вулиця Еспланадна, 20, кабінет, 810, 8 Поверх<br>
                  Київ, 01001
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
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.172426945272!2d30.517275276556575!3d50.43788887158971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cfb3ba5516fd%3A0x781f856b298082a7!2zTG9nb3MgSVQgQWNhZGVteSB8INCa0YPRgNGB0Lgg0L_RgNC-0LPRgNCw0LzRg9Cy0LDQvdC90Y8g0JrQuNGX0LI!5e0!3m2!1suk!2sua!4v1710144987699!5m2!1suk!2sua" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>        </div>
        </div>
</template>
  
<script>

</script>
  
<style>
#map {
    height: 500px;
    width: 600px;
    margin: 30px 0;
}
.marker-icon {
  font-size: 28px;
  color: #008ba3;
}
.cont-container {
  background-color: #f2f2f2;
  margin-top: 120px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 20px;
}
.container-side {
  width: 30%;
  margin-top: 50px;
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

(function () {
  "use strict";

  function init() {
    var btn = document.getElementById("submitBtn");

    if (!btn) return;

    btn.addEventListener("click", function () {
      var ids = [
        "name", "phone", "email", "brand",
        "model", "year", "service", "datetime"
      ];

      var values = {};

      ids.forEach(function (id) {
        var el = document.getElementById(id);
        values[id] = el ? el.value.trim() : "";
      });

      // Проверяем заполнение всех полей
      for (var i = 0; i < ids.length; i++) {
        if (!values[ids[i]]) {
          Swal.fire({
            icon: "warning",
            title: "Заполните все поля",
            text: "Пожалуйста, заполните форму полностью.",
            confirmButtonText: "Понятно"
          });
          return;
        }
      }

      // Проверяем имя
      if (values.name.length < 2) {
        Swal.fire({
          icon: "error",
          title: "Ошибка",
          text: "Введите имя (минимум 2 символа)."
        });
        return;
      }

      // Проверяем телефон
      var phone = values.phone.replace(/\D/g, "");

      if (phone.length !== 11) {
        Swal.fire({
          icon: "error",
          title: "Некорректный телефон",
          text: "Введите номер телефона из 11 цифр."
        });
        return;
      }

      // Проверяем e-mail
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        Swal.fire({
          icon: "error",
          title: "Некорректный e-mail",
          text: "Введите правильный адрес электронной почты."
        });
        return;
      }

      // Проверяем год автомобиля
      var year = Number(values.year);
      var currentYear = new Date().getFullYear();

      if (
        !Number.isInteger(year) ||
        year < 1886 ||
        year > currentYear
      ) {
        Swal.fire({
          icon: "error",
          title: "Некорректный год",
          text: "Введите год от 1886 до " + currentYear + "."
        });
        return;
      }

      // Проверяем дату записи
      var selectedDate = new Date(values.datetime);

      if (
        isNaN(selectedDate.getTime()) ||
        selectedDate < new Date()
      ) {
        Swal.fire({
          icon: "error",
          title: "Некорректная дата",
          text: "Выберите дату и время в будущем."
        });
        return;
      }

      // Показываем успешное сообщение
      Swal.fire({
        icon: "success",
        title: "Заявка принята!",
        text: "Спасибо, " + values.name +
          "! Ваша заявка успешно оформлена.",
        confirmButtonText: "Отлично!",
        confirmButtonColor: "#f0ad4e"
      }).then(function () {
        // Очищаем поля после закрытия окна
        ids.forEach(function (id) {
          var el = document.getElementById(id);
          if (el) el.value = "";
        });
      });

      // Данные никуда не отправляются и не сохраняются
      console.log("Демонстрационная отправка формы:", values);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

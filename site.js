(function () {
  "use strict";

  function init() {
    var btn = document.getElementById("submitBtn");

    if (!btn) {
      return;
    }

    btn.addEventListener("click", function () {
      var nameEl = document.getElementById("name");
      var phoneEl = document.getElementById("phone");
      var emailEl = document.getElementById("email");
      var yearEl = document.getElementById("year");

      var name = nameEl ? nameEl.value.trim() : "";
      var phone = phoneEl ? phoneEl.value.replace(/\D/g, "") : "";
      var email = emailEl ? emailEl.value.trim() : "";
      var year = yearEl ? Number(yearEl.value) : 0;

      console.log("Данные формы:", {
        name: name,
        phone: phone,
        email: email,
        year: year,
      });

      if (name.length < 2) {
        Swal.fire({
          icon: "error",
          title: "Ошибка",
          text: "Введите имя (минимум 2 символа).",
        });
        return;
      }

      if (phone.length < 11) {
        Swal.fire({
          icon: "error",
          title: "Ошибка",
          text: "Введите корректный номер телефона (11 цифр).",
        });
        return;
      }

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        Swal.fire({
          icon: "error",
          title: "Ошибка",
          text: "Введите корректный e-mail.",
        });
        return;
      }

      if (year && (year < 1900 || year > 2026)) {
        Swal.fire({
          icon: "error",
          title: "Ошибка",
          text: "Год выпуска должен быть от 1900 до 2026.",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Заявка принята!",
        text: "Спасибо, " + name + "! Мы свяжемся с вами.",
      });

      var ids = ["name", "phone", "email", "brand", "model", "year", "service", "datetime"];
      ids.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.value = "";
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

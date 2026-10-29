document.addEventListener("DOMContentLoaded", () => {
  const form = document.forms["myForm"];
  const btn = document.getElementById("submitBtn");

  if (!form || !btn) {
    console.error("Не найдена форма name='myForm' или кнопка id='submitBtn'");
    return;
  }

  btn.addEventListener("click", () => {
    const data = new FormData(form);
    console.log(Object.fromEntries(data.entries()));

    const name = (data.get("name") || "").trim();
    const phone = (data.get("phone") || "").replace(/\D/g, "");
    const year = Number(data.get("year"));

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
      text: `Спасибо, ${name}! Мы свяжемся с вами.`,
    });

    form.reset();
  });
});

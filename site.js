const form = document.forms["myForm"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  console.log(Object.fromEntries(data.entries()));

  const phone = data.get("phone");
  const year = Number(data.get("year"));

  if (phone.replace(/\D/g, "").length < 11) {
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
    text: `Спасибо, ${data.get("name")}! Мы свяжемся с вами.`,
  });

  form.reset();
});

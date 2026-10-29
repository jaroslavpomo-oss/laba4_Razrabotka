
"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("submitBtn");

    if (!button) return;

    // Кнопка никогда не отправляет HTML-форму
    button.type = "button";

    button.addEventListener("click", async function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (typeof Swal === "undefined") {
            alert("SweetAlert2 не загрузился. Проверь подключение к интернету.");
            return;
        }

        const value = (id) => {
            const element = document.getElementById(id);
            return element ? element.value.trim() : "";
        };

        const name = value("name");
        const phone = value("phone");
        const email = value("email");
        const brand = value("brand");
        const model = value("model");
        const year = value("year");
        const service = value("service");
        const datetime = value("datetime");

        if (!name || !phone || !email || !brand ||
            !model || !year || !service || !datetime) {
            await Swal.fire({
                icon: "warning",
                title: "Заполните все поля",
                text: "Пожалуйста, заполните все поля формы.",
                confirmButtonText: "Понятно"
            });
            return;
        }

        if (name.length < 2) {
            await Swal.fire({
                icon: "error",
                title: "Некорректное имя",
                text: "Имя должно содержать минимум 2 символа."
            });
            return;
        }

        if (phone.replace(/\D/g, "").length !== 11) {
            await Swal.fire({
                icon: "error",
                title: "Некорректный телефон",
                text: "Введите номер телефона из 11 цифр."
            });
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            await Swal.fire({
                icon: "error",
                title: "Некорректный e-mail",
                text: "Введите правильный адрес электронной почты."
            });
            return;
        }

        const currentYear = new Date().getFullYear();
        const carYear = Number(year);

        if (!Number.isInteger(carYear) ||
            carYear < 1886 ||
            carYear > currentYear) {
            await Swal.fire({
                icon: "error",
                title: "Некорректный год",
                text: `Введите год выпуска от 1886 до ${currentYear}.`
            });
            return;
        }

        const selectedDate = new Date(datetime);

        if (Number.isNaN(selectedDate.getTime()) ||
            selectedDate <= new Date()) {
            await Swal.fire({
                icon: "warning",
                title: "Выберите дату в будущем",
                text: "Укажите будущую дату и время записи."
            });
            return;
        }

        await Swal.fire({
            icon: "success",
            title: "Заявка принята!",
            text: `Спасибо, ${name}! Демонстрация отправки прошла успешно.`,
            confirmButtonText: "Отлично!",
            confirmButtonColor: "#f0ad4e"
        });

        // Очищаем поля; сетевых запросов не выполняем
        [
            "name", "phone", "email", "brand",
            "model", "year", "datetime"
        ].forEach(function (id) {
            const element = document.getElementById(id);
            if (element) element.value = "";
        });

        const serviceSelect = document.getElementById("service");
        if (serviceSelect) serviceSelect.selectedIndex = 0;
    });
});

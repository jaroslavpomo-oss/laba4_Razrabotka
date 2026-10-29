
"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("submitBtn");

    if (!submitBtn) {
        console.error("Кнопка submitBtn не найдена");
        return;
    }

    // Запрещаем стандартную отправку формы
    submitBtn.type = "button";

    submitBtn.addEventListener("click", async function (event) {
        event.preventDefault();

        const getValue = (id) => {
            const element = document.getElementById(id);
            return element ? element.value.trim() : "";
        };

        const name = getValue("name");
        const phone = getValue("phone");
        const email = getValue("email");
        const brand = getValue("brand");
        const model = getValue("model");
        const year = getValue("year");
        const service = getValue("service");
        const datetime = getValue("datetime");

        // Проверяем подключение SweetAlert2
        if (typeof Swal === "undefined") {
            alert("Не удалось загрузить SweetAlert2. Проверь подключение к интернету.");
            return;
        }

        // Проверяем заполнение полей
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

        // Проверяем имя
        if (name.length < 2) {
            await Swal.fire({
                icon: "error",
                title: "Некорректное имя",
                text: "Имя должно содержать минимум 2 символа."
            });
            return;
        }

        // Проверяем телефон
        const phoneDigits = phone.replace(/\D/g, "");

        if (phoneDigits.length !== 11) {
            await Swal.fire({
                icon: "error",
                title: "Некорректный телефон",
                text: "Введите номер телефона из 11 цифр."
            });
            return;
        }

        // Проверяем e-mail
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            await Swal.fire({
                icon: "error",
                title: "Некорректный e-mail",
                text: "Введите правильный адрес электронной почты."
            });
            return;
        }

        // Проверяем год выпуска
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

        // Проверяем дату записи
        const selectedDate = new Date(datetime);

        if (Number.isNaN(selectedDate.getTime()) ||
            selectedDate <= new Date()) {
            await Swal.fire({
                icon: "warning",
                title: "Выберите дату в будущем",
                text: "Дата и время записи должны быть позже текущего момента."
            });
            return;
        }

        // Никаких fetch, POST или отправки на сервер
        const result = await Swal.fire({
            icon: "success",
            title: "Заявка оформлена!",
            text: `Спасибо, ${name}! Демонстрация отправки прошла успешно.`,
            confirmButtonText: "Отлично!",
            confirmButtonColor: "#f0ad4e"
        });

        // Очищаем поля после подтверждения
        if (result.isConfirmed) {
            [
                "name", "phone", "email", "brand",
                "model", "year", "datetime"
            ].forEach(function (id) {
                const element = document.getElementById(id);
                if (element) element.value = "";
            });

            const serviceSelect = document.getElementById("service");
            if (serviceSelect) serviceSelect.selectedIndex = 0;
        }
    });
});

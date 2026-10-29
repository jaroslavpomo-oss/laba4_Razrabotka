
(function () {
    "use strict";

    var btn = document.getElementById("submitBtn");

    if (!btn) return;

    btn.addEventListener("click", function (event) {
        event.preventDefault();

        var name = document.getElementById("name").value.trim();

        if (typeof Swal === "undefined") {
            alert("Не удалось загрузить SweetAlert2. Проверь подключение к интернету.");
            return;
        }

        Swal.fire({
            title: "Заявка принята!",
            text: name
                ? "Спасибо, " + name + "! Заявка успешно обработана."
                : "Демонстрационная отправка выполнена успешно!",
            icon: "success",
            confirmButtonText: "Отлично!",
            confirmButtonColor: "#f0ad4e"
        });
    });
})();

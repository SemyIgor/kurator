export default function shadowFade() {
    // Находим Затухающую Тень
    const shadowFadeBg = document.querySelector(".shadow-fade");

    // Находим кнопки "Заказать [+ ...]" и первую закладку в nav ("ЗАКАЗАТЬ РАБОТУ")
    const toOrderButtons = document.querySelectorAll(
        ".red-btn, .header-nav ul li.main-page"
    );
    console.log("toOrderButtons: ", toOrderButtons);

    // Модуль обработки нажатия кнопок "Заказать работу"
    if (toOrderButtons.length > 0) {
        // Подключаем к кнопкам "Заказать" событие 'click' и вызываем функцию для его обработки
        toOrderButtons.forEach((button) => {
            if (button.textContent.includes("Заказать")) {
                button.addEventListener("click", (event) => {
                    event.preventDefault();
                    showToOrderWorkWindow();
                });
            }
        });
    }

    // Функция "включения" окна формы заказа документа
    function displayOrderWorkWindow() {
        const orderWorkWindow =
            shadowFadeBg.querySelector(".work-order-window");
        // Временно отключено
        // orderWorkWindow.classList.remove("display--none");

        // Обработка крестика закрытия окна
        crossToCloseWindow(orderWorkWindow);
    }

    // Функция вывода на экран окна заказа работы
    function showToOrderWorkWindow() {
        displayOrderWorkWindow();
        showShadow();
    }

    // Функция закрытия окна по клику на крестик
    function crossToCloseWindow(popUp) {
        // Находим крестик закрытия окна и подключаем слушатель
        const crossClose = popUp.querySelector(".cross-close");
        crossClose.addEventListener("click", (event) => {
            // Временно отключено
            // popUp.classList.add("display--none");
            hideShadow();
        });
    }

    // Показываем затемнённое окно
    function showShadow() {
        shadowFadeBg.classList.add("shadow-fade--shown");
        document.body.style.overflow = "hidden";

        // Отслеживаем нажатие на "тень" окно:
        shadowFadeBg.addEventListener("click", (event) => {
            checkToCloseShadow();
        });
    }

    // Проверяем нажатие на "тень" и убираем её, если клик был за пределами всплывающего "окна" ("всплытие" обнаружило класс контейнера "тени" а не "окна")
    function checkToCloseShadow() {
        const bodyLimit = document.querySelector("body");

        bodyLimit.addEventListener("click", (event) => {
            if (
                event.target.classList.contains("shadow-fade__container") ||
                event.target.classList.contains("shadow-fade")
            ) {
                console.log("Есть заказать!");
                // Закрываем все окна внутри shadow
                // Временно отключено
                // closeAllShadowChildren();
                // Убираем "тень"
                hideShadow();
            }
        });
    }

    // Функция закрытия всех окон - детей shadow
    function closeAllShadowChildren() {
        const shadowChilds = shadowFadeBg.querySelectorAll(".shadow-child");
        if (shadowChilds.length > 0) {
            shadowChilds.forEach((child) => {
                child.classList.add("display--none");
            });
        }
    }

    // Функция ухода "тени"
    function hideShadow() {
        shadowFadeBg.classList.remove("shadow-fade--shown");
        document.body.style.overflow = "";
    }
}

export default function shadowFade() {
    // Находим Затухающую Тень
    const shadowFadeBg = document.querySelector(".shadow-fade");

    // Находим кнопки "Заказать [+ ...]" и первую закладку в nav ("ЗАКАЗАТЬ РАБОТУ")
    const toOrderButtons = document.querySelectorAll(
        ".red-btn, .header-nav ul li.main-page"
    );

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

    formDropDownList();

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

    // Функция обработки выпадающего списка в форме
    function formDropDownList() {
        // Находим элементы, содержащие выпадающие списки
        const findDropDownLabels =
            shadowFadeBg.querySelectorAll("label.drop-down");

        if (findDropDownLabels.length > 0) {
            findDropDownLabels.forEach((label) => {
                label.addEventListener("touchstart", (event) => {
                    label.classList.add("hover");
                });
                label.addEventListener("touchend", (event) => {
                    label.classList.remove("hover");
                });
                // Находим поле input в каждом найденном элементе
                const formDropDownListInput = label.querySelector("input");

                // Находим выпадающий список в каждом элементе
                const dropDownList = label.querySelector(".works-items");

                // Находим элементы списка и подключаем слушатель к каждому
                const dropDownListItems =
                    dropDownList.querySelectorAll(".works-item");

                dropDownListItems.forEach((item) => {
                    item.addEventListener("click", (event) => {
                        formDropDownListInput.value = event.target.textContent;

                        resetDropList(label);
                    });

                    item.addEventListener("touchstart", (event) => {
                        console.log("touchstart");
                        item.classList.add("hover");
                    });

                    item.addEventListener("touchmove", (event) => {
                        item.classList.add("hover");
                    });
                    item.addEventListener("touchend", (event) => {
                        item.classList.remove("hover");
                    });
                });
            });
        }
    }

    function resetDropList(label) {
        const dropDownList = label.querySelector(".works-items");
        // Убираем список из DOM на 0.5сек
        dropDownList.classList.remove("display--flex");
        dropDownList.classList.add("display--none");
        setTimeout(() => {
            // Возвращаем список в DOM через 0.5сек
            restoreDropList(label);
        }, 500); // Имитация асинхронной работы
    }

    function restoreDropList(label) {
        const dropDownList = label.querySelector(".works-items");
        dropDownList.classList.remove("display--none");
        dropDownList.classList.add("display--flex");
    }
}

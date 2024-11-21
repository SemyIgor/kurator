export default function shadowTop() {
    // Находим верхнее тёмное окно
    const shadowTopBg = document.querySelector(".shadow-top");
    console.log("shadowTopBg: ", shadowTopBg);

    document.addEventListener("DOMContentLoaded", function () {
        console.log("DOM полностью загружен и обработан");
        displayCookieWindow();
        showShadow();
    });

    // Функция "включения" окна-сообщения об использовании cookie
    function displayCookieWindow() {
        const cookieWindow = shadowTopBg.querySelector(".cookie-window");
        cookieWindow.classList.remove("display--none");
    }

    // Показываем затемнённое окно
    function showShadow() {
        shadowTopBg.classList.add("shadow-top--shown");
        document.body.style.overflow = "hidden";

        // Отслеживаем нажатие на "тень" окно:
        shadowTopBg.addEventListener("click", (event) => {
            checkToCloseShadow();
        });
    }

    // Проверяем нажатие на "тень" и убираем её, если клик был за пределами всплывающего "окна" ("всплытие" обнаружило класс контейнера "тени" а не "окна")
    function checkToCloseShadow() {
        const bodyLimit = document.querySelector("body");

        bodyLimit.addEventListener("click", (event) => {
            if (
                event.target.classList.contains("shadow-top__container") ||
                event.target.classList.contains("shadow-top")
            ) {
                // Закрываем все окна внутри shadow
                closeAllShadowChildren();
                // Убираем "тень"
                hideShadow();
            }
        });
    }

    // Функция закрытия всех окон - детей shadow
    function closeAllShadowChildren() {
        const shadowChilds = shadowTopBg.querySelectorAll(".shadow-child");
        if (shadowChilds.length > 0) {
            shadowChilds.forEach((child) => {
                child.classList.add("display--none");
            });
        }
    }

    // Функция ухода "тени"
    function hideShadow() {
        shadowTopBg.classList.remove("shadow-top--shown");
        document.body.style.overflow = "";
    }
}

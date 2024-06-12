(function (window) {

    if (typeof window === "undefined") return;

    const mainContent = document.getElementById("main-content");

    const mainContentSectionOrNull = mainContent.querySelector("section");
    const mainContentButtonOrNull = mainContent.querySelector("section > button");

    if (!mainContentSectionOrNull) return;
    if (!mainContentButtonOrNull) return;
    
    mainContentButtonOrNull.addEventListener("click", function (event) {

        mainContentSectionOrNull.style.cssText = "background: #4f1c03;";
        mainContentButtonOrNull.style.cssText = "background: #805937; border-color: #805237;";

    });

})(window)
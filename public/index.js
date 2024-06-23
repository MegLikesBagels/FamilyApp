(function (window) {
    /* Reference:
     * | * = classes
     * | # = id
     * | > = direct child
     * | + = the element immediately after
     * | ~ = any element after
     * | :nth-child = the X child of type, e.g. li > a:nth-child(4) is the 4th a element directly inside a li element
     */
    let navbar = document.querySelector("#navbar"); // gets the navbar element
    let navLinks = document.querySelectorAll("#navbar > ul > li > a"); // gets all nav link elements inside our navbar element
    let navVisualAid = document.querySelector("#nav-visual-aid"); // gets the visual aid element
    let lastNavLinkSelected = null;

    if (navLinks.length <= 0) return; // If Elements are not found, do nothing.

    // For each element in navLinks add the onMouseOver function onNavLinkHover
    navLinks.forEach(function (navLink) {
        navLink.addEventListener("mouseover", onNavLinkHover);
    });

    /**
     * onNavLinkHover
     * @param {MouseEvent} event
     * @returns {void}
     */
    function onNavLinkHover(event) {
        event.stopPropagation(true);

        if (event.target === null) return; // If EventTarget is null, do nothing.

        computeNavVisualAidPosition(event.target);

        return;
    }

    /**
     * computeNavVisualAidPosition
     * @param {HTMLAnchorElement | null} navLink
     * @returns {void}
     */
    function computeNavVisualAidPosition(navLink) {
        if (navLink === null) return; // If navLink isn't the specified, do nothing;

        let navLinkViewportProperties = navLink.getBoundingClientRect();
        let navLinkPosition =
            navLink.parentElement?.parentElement?.offsetLeft +
            navLink.offsetLeft;

        if (navbar === null) return; // If Element doesn't exist, do nothing
        if (navVisualAid === null) return; // If Element doesn't exist, do nothing.

        navVisualAid.style.width = `${navLinkViewportProperties.width}px`;
        navVisualAid.style.left = `${navLinkPosition}px`;

        lastNavLinkSelected = navLink;
    }

    /**
     * onScreenResize
     * @param {Event} event
     * @returns {void}
     */
    function onScreenResize(event) {
        computeNavVisualAidPosition(lastNavLinkSelected);
    }

    window.addEventListener("resize", onScreenResize);
})(window);

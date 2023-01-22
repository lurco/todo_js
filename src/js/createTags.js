export function createTag({tagName = 'div', tagText, tagClasses, tagId, tagAttrs, tagEvents}) {
    const tag = document.createElement(tagName);

    if (tagText !== undefined) {
        const text = document.createTextNode(tagText);
        tag.appendChild(text);
    }

    if (tagClasses !== undefined) {

        if (Array.isArray(tagClasses)) {
            tagClasses.forEach((cls) => {
                tag.classList.add(cls);
            })
        } else {
            tag.classList.add(tagClasses)
        }

    }

    if (tagId !== undefined) {
        tag.id = tagId;
    }

    if (tagAttrs !== undefined) {
        tagAttrs.forEach(({name, value}) => {
            tag.setAttribute(name, value)
        })
    }

    if (tagEvents !== undefined) {
        tagEvents.forEach(({type, cb}) => {
            tag.addEventListener(type, cb)
        })
    }

    return tag;
}

export default createTag;

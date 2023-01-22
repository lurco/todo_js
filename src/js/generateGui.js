import {createTag} from "./createTags.js";
import state from "./store.js";
import {addTask, changeStatus, deleteTask} from "./helpers.js";

export function generateTaskList() {
    const ulTag = createTag({
        tagName: 'ul',
        tagClasses: ['todo__task']
    });

    state.tasks.forEach(({name, id, status}) => {
        const liTag = createTag({
            tagName: 'li',
            tagClasses: ['todo__task', 'task']
        });

        const statusTag = createTag({
            tagName: 'input',
            tagClasses: 'task__status',
            tagAttrs: [
                {
                    name: 'type',
                    value: 'checkbox'
                },

            ],
            tagId: `taskName_${id}`,
            tagEvents: [{
                name: 'change',
                cb: () => {changeStatus(id, state)}
            }]
        });

        statusTag.checked = status;

        const taskName = createTag({
            tagName: 'label',
            tagText: `${name}`,
            tagClasses: 'task__name',
            tagAttrs: [
                {
                    name: 'for',
                    value: `taskName_${id}`
                }
            ]
        });

        const clearBtn = createTag({
            tagName: 'button',
            tagText: 'Delete',
            tagAttrs: [
                {
                    name: 'type',
                    value: 'button'
                }
            ],
            tagEvents: [
                {
                    type: 'click',
                    cb: () => {
                        deleteTask(id, state)
                    }
                }
            ]
        });

        ulTag.appendChild(liTag);

        liTag.appendChild(statusTag);
        liTag.appendChild(taskName);
        liTag.appendChild(clearBtn);
    })

    return ulTag
}

export function generateGui() {
    const containerTag = createTag({
        tagName: 'div',
        tagClasses: 'container',
    });

    const labelTag = createTag({
        tagName: 'label',
        tagText: 'todos',
        tagClasses: 'todo__title',
        tagAttrs: [{name: 'for', value: 'taskInput'}]

    });

    const inputTag = createTag({
        tagName: 'input',
        tagText: 'todo',
        tagClasses: 'todo__title',
        tagAttrs: [
            {
                name: 'for',
                value: 'taskInput'
            },
            {
                name: 'placeholder',
                value: 'What needs to be done?'
            },
        ],
        tagEvents: [{
            type: 'keyup',
            cb: (event) => {
                    addTask(event, state);
            }
        }]
    });


    containerTag.appendChild(labelTag);
    containerTag.appendChild(inputTag);
    containerTag.appendChild(generateTaskList());

    return containerTag;
}

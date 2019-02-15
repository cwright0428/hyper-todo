import { TodoModel } from './todomvc/todoModel';
import { TodoApp } from './todomvc/TodoApp'
import ReactDOM = require('react-dom');

/**
 * Saving some props we might use later
 * 
 * .hyper-todo background: #f5f5f5;
 */
export function decorateConfig(config) {
    return Object.assign({}, config, {
        css: `
        ${config.css || ''}

        .terms_termGroup {
            width: 70% !important;
        }

        .hyper-todo {
            width: 30%;
            display: block;
            height: 100%;
            position: fixed;
            right: 0;
            border: 1px solid red;
            padding: 10px;
        }

        .sizing-test {
            width: 100%;
            height: 100px;
            border: double black;
        }

        .todo-list {
            list-style: none;
        }
      `
    })
}

function doSomething(dispatch) {
    return (todoText) => {
        dispatch((innerDispatch, getState) => {
            innerDispatch({
                type: 'MY_ACTION',
                todoText,
                effect() { }
            })
        })
    }
}

export function mapTermsDispatch(dispatch, map) {
    map.doSomething = doSomething(dispatch)
    return map
}

export function reduceTermGroups(state, action) {
    switch (action.type) {
        case 'MY_ACTION': {
            state = state.set('newTodo', action.todoText)
        }
    }

    return state
}

export function mapTermsState(state, map) {
    console.log(":: Hi Andrew ::", state.newTodo)
    return Object.assign({}, map, state.newTodo);
}

// export function getTermsProps(uid, parentProps, props) {
//     props = Object.assign(props, {
//         newTodo: parentProps.newTodo
//     });
//     return props;
// }

/**
 * The todo window needs to be put in the markup before the rest of the terminal
 * markup. It gets positioned to the right by default, however.
 */
export function decorateTerms(Hyper, { React }) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            //this.state = { }
        }

        tryToDoSomething() {
            this.props.doSomething("This is my text")
        }

        render() {
            var model = new TodoModel('react-todos');
            var todoApp = <TodoApp model={model} {...this.props} />

            var renderTodoDOM = () => {
                return (
                    <div className='hyper-todo'>
                        {/* {todoApp} */}
                        <button onClick={ e => this.tryToDoSomething() } >Click me</button>
                    </div>
                )
            }

            model.subscribe(renderTodoDOM)

            return (
                React.createElement(Hyper, Object.assign({}, this.props, {
                    customChildrenBefore: renderTodoDOM()
                }))
            )
        }
    };
};
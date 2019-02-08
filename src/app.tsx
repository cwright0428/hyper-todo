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

/**
 * The todo window needs to be put in the markup before the rest of the terminal
 * markup. It gets positioned to the right by default, however.
 */
export function decorateTerms(Hyper, { React }) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = { }
        }

        render() {
            var model = new TodoModel('react-todos');
            var todoApp = <TodoApp model={model} {...this.props} />

            var renderTodoDOM = () => {
                return (
                    <div className='hyper-todo'>
                        {todoApp}
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
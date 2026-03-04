import '@testing-library/jest-dom/extend-expect'
import React from 'react';
import ReactDOM from 'react-dom';
import { getQueriesForElement, fireEvent } from '@testing-library/dom'

const Counter = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
}

function render(ui) {
  const container = document.createElement('div')
  ReactDOM.render(ui, container)
  document.body.appendChild(container) // needed because how react works
  return {
    ...getQueriesForElement(container),
    container,
    cleanup() {
      ReactDOM.unmountComponentAtNode(container)
      document.body.removeChild(container)
    }
  }
}

test('renders a counter', () => {
  const { getByText, cleanup } = render(<Counter />);
  const countElement = getByText('0');
  fireEvent.click(countElement);
  expect(countElement).toHaveTextContent('1');

  fireEvent.click(countElement);
  expect(countElement).toHaveTextContent('2');
  cleanup()
  console.log(document.body.outerHTML)
})
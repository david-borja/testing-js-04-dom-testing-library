/** @jsx Preact.h */
import '@testing-library/jest-dom/extend-expect'
import * as Preact from 'preact'
import { getQueriesForElement } from '@testing-library/dom'
import { fireEventAsync } from './fire-event-async'

class Counter extends Preact.Component {
  state = { count: 0 }
  increment = () => this.setState(({ count }) => ({ count: count + 1 }))
  render() {
    return (
      <div>
        <button onClick={this.increment}>{this.state.count}</button>
      </div>
    )
  }
}

function render(ui) {
  const container = document.createElement('div')
  Preact.render(ui, container)
  return {
    container,
    ...getQueriesForElement(container)
  }
}

test('renders a counter', async () => {
  // The reason this is not working, is because Preact does not render synchronously like React does.

  // const { getByText } = render(<Counter />);
  // const counter = getByText('0')
  // fireEvent.click(counter)
  // expect(counter).toHaveTextContent('1')
  // fireEvent.click(counter)
  // expect(counter).toHaveTextContent('2')

  // Preact will actually wait until the next tick of the event loop to go ahead and re - render.Our counter doesn't get updated until the next tick of the event loop, so dom-testing-library has the wait utility that we can use for this case.

  // const { getByText } = render(<Counter />);
  // const counter = getByText('0')
  // fireEvent.click(counter)
  // await wait()
  // expect(counter).toHaveTextContent('1')
  // fireEvent.click(counter)
  // await wait()
  // expect(counter).toHaveTextContent('2')

  const { getByText } = render(<Counter />);
  const counter = getByText('0')
  await fireEventAsync.click(counter)
  expect(counter).toHaveTextContent('1')
  await fireEventAsync.click(counter)
  expect(counter).toHaveTextContent('2')
})
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '.';
describe('<Button />', () => {

    it('should render the button with the text "Load More"', () => {
      render(<Button text="load more"/>)

      expect.assertions(1)

      const button = screen.getByRole('button', {name: /load more/i })
      expect(button).toBeInTheDocument()
    });

    it('should call function on button click', () => {

      const fn = jest.fn();

      render(<Button text="load more" onClick={fn}/>)
      expect.assertions(1)

      const button = screen.getByRole('button', {name: /load more/i })
      userEvent.click(button)
      userEvent.click(button)
      expect(fn).toHaveBeenCalledTimes(2)
    });

    it('should be disabled when disabled is true ', () => {

      render(<Button text="load more" disabled={false}/>)
      expect.assertions(1)

      const button = screen.getByRole('button', {name: /load more/i })
      expect(button).toBeEnabled()
    });

    it('should be disabled when disabled is false ', () => {

      render(<Button text="load more" disabled={true}/>)
      expect.assertions(1)

      const button = screen.getByRole('button', {name: /load more/i })
      expect(button).toBeDisabled()
    });

});
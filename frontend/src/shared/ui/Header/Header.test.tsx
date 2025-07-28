import {fireEvent, render, screen} from "@testing-library/react";
import {Header} from "@/shared/ui/Header/Header";
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

describe('Header', () => {

  afterEach(() => {
    mockRouter.push('/')
  })

  it('renders correctly', () => {
    mockRouter.push('/words');
    render(<Header />);
    expect(screen.getByTestId('/words')).toBeInTheDocument();
    // expect(screen.getByTestId('/wordsPageWrapped')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('/words'))
    expect(screen.getByTestId('/words')).toHaveStyle({ color: '#ffffff' })

  })
})
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PostCard } from '.';
import { mock } from '../../utils/mock';

describe('<PostCard />', () => {

    it('should render PostCard correctly', () => {
        render(<PostCard {...mock}/>)
        //expect.assertions(2)
    

        const postCardH1 = screen.getByRole('heading', {name: 'Ola'})
        const postCardP = screen.getByText('Ola meu nome e fernando')

        expect(postCardH1).toBeInTheDocument()
        expect(postCardP).toBeInTheDocument()
    });

    it('should match snapshot', () => {
        const {container} = render(<PostCard {...mock}/>)
        expect(container.firstChild).toMatchSnapshot()
    });


});
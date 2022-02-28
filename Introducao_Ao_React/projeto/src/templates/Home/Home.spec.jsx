import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import Home from './index'
import userEvent from '@testing-library/user-event';

const handles = [
  rest.get('https://jsonplaceholder.typicode.com/todos', 
    async (req, res, ctx) => {
      return res(ctx.json([
        {
          "userId": 1,
          "id": 1,
          "title": "delectus aut autem",
          "completed": false
        },
        {
          "userId": 1,
          "id": 2,
          "title": "quis ut nam facilis et officia qui",
          "completed": false
        },
        {
          "userId": 1,
          "id": 3,
          "title": "fugiat veniam minus",
          "completed": false
        },
      ]))
    }
  )
]

const server = setupServer(...handles)

describe('<Home />', () => {

  beforeAll(() => {
    server.listen()
  });

  afterEach(() => server.resetHandlers())

  afterAll(() => {
    server.close()
  })

  
  it('should render search, posts and load more', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText("Não há posts...")
    
    await waitForElementToBeRemoved(noMorePosts)
    
    expect.assertions(2)

    const search = screen.getByPlaceholderText(/pesquise aqui.../i)
    expect(search).toBeInTheDocument()

    const button = screen.getByRole('button',{name: /More posts/i})
    expect(button).toBeInTheDocument()
  });

  it('should search for posts', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText("Não há posts...")
    
    await waitForElementToBeRemoved(noMorePosts)
    
    expect.assertions(10)

    const search = screen.getByPlaceholderText(/pesquise aqui.../i)
    
    expect(screen.getByRole('heading', {name: '1'})).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: '2'})).toBeInTheDocument()
    expect(screen.queryByRole('heading', {name: '3'})).not.toBeInTheDocument()

    userEvent.type(search, 'delectus aut autem')
    expect(screen.getByRole('heading', {name: '1'})).toBeInTheDocument()
    expect(screen.queryByRole('heading', {name: '2'})).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', {name: '3'})).not.toBeInTheDocument()

    userEvent.clear(search)
    expect(screen.getByRole('heading', {name: '1'})).toBeInTheDocument()
    expect(screen.queryByRole('heading', {name: '2'})).toBeInTheDocument()
    expect(screen.queryByRole('heading', {name: '3'})).not.toBeInTheDocument()

    userEvent.type(search, 'sdfasdfasd')
    expect(screen.getByText("Não há posts...")).toBeInTheDocument()
  });

  it('should load more posts', async () => {
    render(<Home />)
    const noMorePosts = screen.getByText("Não há posts...")
    
    await waitForElementToBeRemoved(noMorePosts)
    
    //expect.assertions(2)

    const button = screen.getByRole('button',{name: /More posts/i})
    
    userEvent.click(button)
    expect(screen.getByRole('heading', {name: '3'})).toBeInTheDocument()
    expect(button).toBeDisabled()
  });

});



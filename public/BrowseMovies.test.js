import React from 'react'
import { shallow } from 'enzyme'
import BrowseMovies from '../src/BrowseMovies'

function flushPromises(){
	return new Promise(resolve => setImmediate(resolve));
}


describe('BrowseMovies', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<BrowseMovies />)


    expect(wrapper.length).toBe(1)
  })

  test('displays the movie name', async () => {
    //SETUP
    const movieName = "Guardians of the Galaxy Vol. 2"
    const fetchMock = jest.fn()
    const oldFetch = global.fetch
    global.fetch = fetchMock
    fetchMock.mockImplementation(() => {
      return Promise.resolve({
        json: () => {
          return Promise.resolve({
            movies : movieName
          })
        }
      })
    })

    const wrapper = await shallow(<BrowseMovies />)
    //EXERCISE
    await wrapper.update()
    
    //ASSERT
    expect(fetchMock).toHaveBeenCalledWith("http://localhost:3001/movies")
    expect(wrapper.state('movies')).toBe(movieName)
    expect(wrapper.text()).toBe(movieName)

    //TEARDOWN
    global.fetch = oldFetch
  })
  test('displays "Unable to load movies" when API responds with status 500', async () => {
    //Setup
    const expectedStatusCode = 500
    const expectedErrorMessage = 'Unable to load movies'
    const fetchMock = jest.fn()
    const oldFetch = global.fetch
    global.fetch = fetchMock
    fetchMock.mockImplementation(() => {
      return Promise.resolve({
        json: () => {
          return Promise.reject({
            status: expectedStatusCode
          })
        }
      })
    })
    //Exercise
    const wrapper = shallow(<BrowseMovies />)

	await flushPromises()

    await wrapper.update()
    //Assert
    expect(fetchMock).toHaveBeenCalledWith("http://localhost:3001/movies")
    expect(wrapper.state('error')).toBe(expectedErrorMessage)
    expect(wrapper.text()).toBe(expectedErrorMessage)

    //Teardown
    global.fetch = oldFetch
  })
})

import React from 'react'
import { shallow } from 'enzyme'
import BrowseMovies from './BrowseMovies'

function flushPromises(){
	return new Promise(resolve => setImmediate(resolve));
}


describe('Test 1', () => {
  test('renders without crashing', () => {
    const wrapper = shallow( < BrowseMovies / >
  )
    expect(wrapper.length).toBe(1)
  })
})

  describe('Test 2', () => {
    test('Testing the connection', async () => {
      //SETUP

      const fetchMock = jest.fn()
      const oldFetch = global.fetch
      global.fetch = fetchMock
      fetchMock.mockImplementation(() => {
        return Promise.resolve({
          json: () => {
            return Promise.resolve({
              movies: movieName
            })
          }
        })
      })
      const wrapper = await shallow( < BrowseMovies / >
    )
      //EXERCISE
      await wrapper.update()

      //ASSERT
      expect(fetchMock).toBeDefined()
    })
  })

  describe('Test 3', () => {
    test('Testing movies object', async () => {
      //SETUP

      const fetchMock = jest.fn()
      const oldFetch = global.fetch
      global.fetch = fetchMock
      fetchMock.mockImplementation(() => {
        return Promise.resolve({
          json: () => {
            return Promise.resolve({
              movies: movieName
            })
          }
        })
      })

      const wrapper = await shallow( < BrowseMovies / >
    )
      //EXERCISE
      await wrapper.update()

      //ASSERT
      expect(wrapper).toBeDefined()
    })
  })

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import SearchBar from '../components/Animal/Animal'



test('Animal renders correctly', () => {
	render(<SearchBar />)
})